import {computed, inject, Injectable, signal} from '@angular/core';
import {PostVirtualScrollState, PostVirtualScrollStatus} from "../../interfaces/post.virtual.scroll.state";
import {catchError, concatMap, EMPTY, map, merge, startWith, Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {connect} from "ngxtension/connect";
import {PostService} from "../../shared/data-access/post.service";

@Injectable()
export class VirtualScrollPostService {
  private postService = inject(PostService);
  private state = signal<PostVirtualScrollState>({
    posts: [],
    error: null,
    pageSize: 10,
    nextPageNumber: null,
    status: PostVirtualScrollStatus.PENDING
  });

  //selectors
  status = computed(() => this.state().status);
  posts = computed(() => this.state().posts);
  pageNumber = computed(() => this.state().nextPageNumber);
  error = computed(() => this.state().error);

  // sources
  private error$ = new Subject<string>();
  scrolled$ = new Subject<number | null>();

  private postsLoaded$ = this.scrolled$
    .pipe(
      startWith(0),
      concatMap((pageNumber) => {
        return this.postService.getPosts('', pageNumber!, 100).pipe(
          map((response => {
            response.pageNumber += 1;
            return response;
          })),
          catchError((err: HttpErrorResponse) => {
            this.error$.next(err.message);
            return EMPTY;
          })
        )
      })
    );

  constructor() {
    // reducers
    const nextState$ = merge(
      this.error$.pipe(map((error) => ({status: PostVirtualScrollStatus.ERROR, error})))
    );

    connect(this.state)
      .with(this.postsLoaded$, (state, response) => ({
          posts: [...state.posts, ...response.results],
          status: PostVirtualScrollStatus.LOADED,
          nextPageNumber: response.pageNumber
        })
      )
      .with(nextState$);
  }

}
