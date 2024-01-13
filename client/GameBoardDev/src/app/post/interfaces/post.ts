export interface PostDTO {
  id: number;
  title: string;
  content: string;
}

export type CreatePostDTO = Omit<PostDTO, 'id'>;
