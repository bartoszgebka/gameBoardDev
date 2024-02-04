import {inject, Injectable} from '@angular/core';
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
import {HttpErrorResponse} from "@angular/common/http";
import {PageEvent} from "@angular/material/paginator";
import {PostService} from "../../shared/data-access/post.service";
import {signalSlice} from "ngxtension/signal-slice";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class PostListService {
  private postService = inject(PostService);
  private matSnackBar = inject(MatSnackBar);

  private initialState: PostListState = {
    status: PostListStatus.PENDING,
    posts: [],
    pageNumber: 0,
    pageSize: 5,
    totalElements: 0,
    error: null
  };

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
    switchMap(([title, pageNumber, pageSize]) => {
      return this.postService.getPosts(title, pageNumber, pageSize).pipe(
        catchError((err: HttpErrorResponse) => {
          this.error$.next(err.message);
          return EMPTY;
        })
      )
    })
  );

  private nextState$ = merge(
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

  state = signalSlice({
    initialState: this.initialState,
    sources: [this.nextState$],
    effects: (state) => ({
      hasError: () => {
        if (state.error()) {
          this.matSnackBar.open("Nie udało się pobrać postów.", "Zamknij");
        }
      }
    })
  })

  public setInputValue(value: string) {
    this.inputTitle$.next(value);
  }

  public pageChange(value: PageEvent) {
    return this.pageChange$.next(value);
  }
}
