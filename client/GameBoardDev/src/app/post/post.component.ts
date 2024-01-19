import { Component } from '@angular/core';
import {PostService} from "./shared/data-access/post.service";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterLink} from "@angular/router";
import {VirtualScrollPostComponent} from "./virtual-scroll/virtual.scroll.post.component";
import PostListComponent from "./list/post.list.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    RouterLink,
    VirtualScrollPostComponent,
    PostListComponent
  ],
  templateUrl: './post.component.html',
  providers: [PostService]
})
export class PostComponent {

}
