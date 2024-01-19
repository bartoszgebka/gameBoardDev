import {PostDetailDTO} from "./post";

export interface PostVirtualScrollState {
  status: PostVirtualScrollStatus;
  posts: PostDetailDTO[];
  pageSize: number;
  nextPageNumber: number | null;
  error: string | null;
}

export enum PostVirtualScrollStatus {
  PENDING, LOADED, ERROR
}
