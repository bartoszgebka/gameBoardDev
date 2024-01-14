import {Injectable, signal} from '@angular/core';
import {PostListState, PostListStatus} from "../../interfaces/post.list.state";
import {Subject} from "rxjs";

@Injectable()
export class PostListService {
  private inputTitle$ = new Subject<string>();

  private state = signal<PostListState>({
    status: PostListStatus.PENDING,
    posts: [],
    error: null
  });

  //selectors


  constructor() { }

  public setInput(value: string) {
    this.inputTitle$.next(value);
  }
}
