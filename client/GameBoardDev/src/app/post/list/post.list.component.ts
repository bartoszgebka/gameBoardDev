import {Component, inject} from '@angular/core';
import {PostListService} from "./data-access/post.list.service";
import {PostListSearchComponent} from "./ui/post.list.search.form/post.list.search.component";
import {FormBuilder} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, startWith} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {JsonPipe} from "@angular/common";
import {PostCardComponent} from "../shared/ui/post-card/post.card.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PostListStatus} from "../interfaces/post.list.state";
import {MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostListSearchComponent,
    JsonPipe,
    PostCardComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  templateUrl: './post.list.component.html',
  providers: [PostListService],
  styles: [`
    :host {
      margin-top: 1.5rem;
      display: block;
    }
    .posts-wrapper {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `]
})
export default class PostListComponent {
  private fb = inject(FormBuilder);
  protected postListService = inject(PostListService);
  protected PostListStatus = PostListStatus;

  titleControl = this.fb.nonNullable.control('');

  constructor() {
    this.titleControl.valueChanges.pipe(
      takeUntilDestroyed(),
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      map((title) => title.length ? title : '')).subscribe(title => {
      this.postListService.setInputValue(title);
    });
  }
}
