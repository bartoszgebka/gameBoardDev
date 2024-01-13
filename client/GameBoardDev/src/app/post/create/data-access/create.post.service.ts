import {computed, inject, Injectable, signal} from '@angular/core';
import {CreatePostState, CreatePostStatus} from "../../interfaces/create.post.state";
import {catchError, EMPTY, map, merge, Subject, switchMap} from "rxjs";
import {ValidationResult} from "../../../shared/interfaces/validate/validate";
import {CreatePostDTO} from "../../interfaces/post";
import {connect} from "ngxtension/connect";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Consts} from "../../../shared/constants/consts";


@Injectable()
export class CreatePostService {
  private http = inject(HttpClient);

  private state = signal<CreatePostState>({
    status: CreatePostStatus.PENDING,
    validationResult: undefined
  });

  // selectors
  status = computed(() => this.state().status);
  validationResult = computed(() => this.state().validationResult);

  // sources
  private error$ = new Subject<ValidationResult>();
  createPost$ = new Subject<CreatePostDTO>();
  private createdPost$ = this.createPost$.pipe(
    switchMap((createPostDTO) => this.create(createPostDTO))
  );

  constructor() {
    // reducers
    const nextState$ = merge(
      this.createPost$.pipe(map(() => ({status: CreatePostStatus.CREATING}))),
      this.createdPost$.pipe(map(() => ({status: CreatePostStatus.SUCCESS}))),
      this.error$.pipe(map((validationResult) => ({status: CreatePostStatus.ERROR, validationResult})))
    );

    connect(this.state, nextState$);
  }

  private create(createPostDTO: CreatePostDTO) {
    return this.http.post<void>(Consts.ADD_POST_URL, createPostDTO, {observe: 'response'}).pipe(
      catchError((err: HttpErrorResponse) => {
        this.error$.next(err.error);
        return EMPTY;
      })
    );
  }
}
