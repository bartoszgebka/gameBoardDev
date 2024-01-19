import {Component, effect, inject} from '@angular/core';
import {VirtualScrollPostService} from "./data-access/virtual.scroll.post.service";
import {PostCardComponent} from "../shared/ui/post-card/post.card.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PostVirtualScrollStatus} from "../interfaces/post.virtual.scroll.state";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  protected matSnackBar = inject(MatSnackBar);
  protected PostVirtualScrollStatus = PostVirtualScrollStatus;

  constructor() {
    effect(() => {
        const error = this.virtualScrollPostService.error();
        if (error) {
          this.matSnackBar.open("Nie udało się pobrać postów.", "Zamknij");
        }
      }
    );
  }
}
