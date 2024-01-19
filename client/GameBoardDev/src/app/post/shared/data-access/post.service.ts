import {inject, Injectable} from '@angular/core';
import {SearchResult} from "../../../shared/interfaces/search/search.result";
import {PostDetailDTO} from "../../interfaces/post";
import {Consts} from "../../../shared/constants/consts";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PostService {
  private http = inject(HttpClient);

  constructor() {
  }

  getPosts(title: string, pageNumber: number, pageSize: number) {
    return this.http.get<SearchResult<PostDetailDTO>>(Consts.LIST_POST_URL, {
      params: {
        title,
        pageNumber,
        pageSize
      }
    })
  }
}
