import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {PostDetailDTO} from "../../../interfaces/post";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    DatePipe
  ],
  templateUrl: './post.card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  post = input.required<PostDetailDTO>();
}
