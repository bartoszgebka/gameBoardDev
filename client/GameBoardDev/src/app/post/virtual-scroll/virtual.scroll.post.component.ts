import {Component, inject} from '@angular/core';
import {VirtualScrollPostService} from "./data-access/virtual.scroll.post.service";
import {PostCardComponent} from "../shared/ui/post-card/post.card.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-virtual-scroll',
  standalone: true,
  imports: [
    PostCardComponent,
    InfiniteScrollModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './virtual.scroll.post.component.html',
  providers: [VirtualScrollPostService]
})
export class VirtualScrollPostComponent {
  protected virtualScrollPostService = inject(VirtualScrollPostService);
}
