import {inject, Injectable} from '@angular/core';
import {CreatePostState, CreatePostStatus} from "../../interfaces/create.post.state";
import {catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {CreatePostDTO} from "../../interfaces/post";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Consts} from "../../../shared/constants/consts";
import {signalSlice} from "ngxtension/signal-slice";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class CreatePostService {
  private http = inject(HttpClient);
  private route = inject(Router);
  private matSnackBar = inject(MatSnackBar);

  private initialState: CreatePostState = {
    status: CreatePostStatus.PENDING,
    validationResult: undefined
  }

  state = signalSlice({
    initialState: this.initialState,
    actionSources: {
      createPost: (_state, $action: Observable<CreatePostDTO>) => {
        return $action.pipe(
          switchMap((createPostDTO) => this.create(createPostDTO))
        )
      }
    },
    effects: (state) => ({
      savePost: () => {
        if (state.status() === CreatePostStatus.SUCCESS) {
          this.matSnackBar.open("Pomyślnie dodano nowy post", "Zamknij");
          this.route.navigate(['home']);
        }
      }
    })
  });

  private create(createPostDTO: CreatePostDTO) {
    return this.http.post<void>(Consts.ADD_POST_URL, createPostDTO, {observe: 'response'}).pipe(
      map(() => ({status: CreatePostStatus.SUCCESS})),
      startWith({status: CreatePostStatus.CREATING}),
      catchError((err: HttpErrorResponse) => {
        return of({status: CreatePostStatus.ERROR, validationResult: err.error});
      })
    );
  }
}
