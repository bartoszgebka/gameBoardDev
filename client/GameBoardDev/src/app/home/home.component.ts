import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import PostListComponent from "../post/list/post.list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatDividerModule,
    PostListComponent
  ],
  templateUrl: './home.component.html'
})
export default class HomeComponent {

}
