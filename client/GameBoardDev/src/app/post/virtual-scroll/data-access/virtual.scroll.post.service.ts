import {inject, Injectable} from '@angular/core';
import {PostVirtualScrollState, PostVirtualScrollStatus} from "../../interfaces/post.virtual.scroll.state";
import {catchError, concatMap, map, Observable, of, startWith} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PostService} from "../../shared/data-access/post.service";
import {signalSlice} from "ngxtension/signal-slice";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class VirtualScrollPostService {
  private postService = inject(PostService);
  private matSnackBar = inject(MatSnackBar);

  private initialState: PostVirtualScrollState = {
    posts: [],
    error: null,
    pageSize: 10,
    nextPageNumber: null,
    status: PostVirtualScrollStatus.PENDING
  }

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      scrolled: (state, $action: Observable<number | null>) =>
        $action.pipe(
          startWith(0),
          concatMap((pageNumber) =>
            this.getPosts(pageNumber!).pipe(
              map(response => ({
                posts: [...state().posts, ...response.results],
                status: PostVirtualScrollStatus.LOADED,
                nextPageNumber: response.pageNumber
              })),
              catchError((err: HttpErrorResponse) =>
                of({status: PostVirtualScrollStatus.ERROR, error: err.message})
              )
            )
          )
        )
    },
    effects: (state) => ({
      hasError: () => {
        if (state.error()) {
          this.matSnackBar.open("Nie udało się pobrać postów.", "Zamknij");
        }
      }
    })
  });

  private getPosts(pageNumber: number) {
    return this.postService.getPosts('', pageNumber, 100).pipe(
      map((response => {
        response.pageNumber += 1;
        return response;
      }))
    )
  }
}
