import { Component } from '@angular/core';
import {PostListService} from "./data-access/post.list.service";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  templateUrl: './post.list.component.html',
  providers: [PostListService]
})
export default class PostListComponent {

}
