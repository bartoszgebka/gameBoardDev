import {computed, inject, Injectable, signal} from '@angular/core';
import {PostListState, PostListStatus} from "../../interfaces/post.list.state";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  map,
  merge,
  Subject,
  switchMap
} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Consts} from "../../../shared/constants/consts";
import {PostDetailDTO} from "../../interfaces/post";
import {connect} from "ngxtension/connect";
import {SearchResult} from "../../../shared/interfaces/search/search.result";
import {PageEvent} from "@angular/material/paginator";

@Injectable()
export class PostListService {
  private http = inject(HttpClient);

  private state = signal<PostListState>({
    status: PostListStatus.PENDING,
    posts: [],
    pageNumber: 0,
    pageSize: 5,
    totalElements: 0,
    error: null
  });

  //selectors
  status = computed(() => this.state().status);
  posts = computed(() => this.state().posts);
  pageNumber = computed(() => this.state().pageNumber);
  pageSize = computed(() => this.state().pageSize);
  totalElements = computed(() => this.state().totalElements);
  error = computed(() => this.state().error);

  // sources
  private error$ = new Subject<string>();
  private inputTitle$ = new Subject<string>();
  private pageChange$ = new BehaviorSubject<PageEvent>({
    pageSize: 5,
    pageIndex: 0,
    length: 0
  });
  private pageNumber$ = merge(
    this.inputTitle$.pipe(map(() => 0)),
    this.pageChange$.pipe(map((page) => page.pageIndex))
  ).pipe(distinctUntilChanged());
  private pageSize$ = this.pageChange$.pipe(map((page) => page.pageSize), distinctUntilChanged());

  private postsLoaded$ = combineLatest([this.inputTitle$, this.pageNumber$, this.pageSize$]).pipe(
    debounceTime(0),
    switchMap(([title, pageNumber, pageSize]) => this.getPosts(title, pageNumber, pageSize))
  );

  constructor() {
    // reducers
    const nextState$ = merge(
      this.inputTitle$.pipe(map(() => ({status: PostListStatus.LOADING, pageNumber: 0}))),
      this.pageNumber$.pipe(map((pageNumber) => ({pageNumber}))),
      this.pageSize$.pipe(map((pageSize) => ({pageSize}))),
      this.postsLoaded$.pipe(map((searchResult) => ({
        status: PostListStatus.LOADED,
        posts: searchResult.results,
        totalElements: searchResult.totalElements
      }))),
      this.error$.pipe(map((error) => ({status: PostListStatus.ERROR, error})))
    );

    connect(this.state).with(nextState$);
  }

  public setInputValue(value: string) {
    this.inputTitle$.next(value);
  }

  public pageChange(value: PageEvent) {
    return this.pageChange$.next(value);
  }

  private getPosts(title: string, pageNumber: number, pageSize: number) {
    return this.http.get<SearchResult<PostDetailDTO>>(Consts.LIST_POST_URL, {
      params: {
        title,
        pageNumber,
        pageSize
      }
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.error$.next(err.message);
        return EMPTY;
      })
    )
  }
}
