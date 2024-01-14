import {PostDTO} from "./post";

export interface PostListState {
  status: PostListStatus;
  posts: PostDTO[];
  error: string | null;
}

export enum PostListStatus {
  PENDING, LOADING, LOADED, ERROR
}
