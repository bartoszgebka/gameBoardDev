import {PostDetailDTO} from "./post";

export interface PostListState {
  status: PostListStatus;
  posts: PostDetailDTO[];
  totalElements: number;
  pageSize: number;
  pageNumber: number;
  error: string | null;
}

export enum PostListStatus {
  PENDING, LOADING, LOADED, ERROR
}
