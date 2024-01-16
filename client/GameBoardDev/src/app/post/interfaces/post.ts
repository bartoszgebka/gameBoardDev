export interface PostDetailDTO {
  id: number;
  authorLogin: string;
  createdDate: Date;
  modifiedAuthorLogin: string;
  modifiedDate: Date;
  title: string;
  content: string;
  commentsNumber: number;
}

export type CreatePostDTO = Pick<PostDetailDTO, 'title' | 'content'>
