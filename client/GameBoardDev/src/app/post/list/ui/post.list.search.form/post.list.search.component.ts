import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-post-list-search',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './post.list.search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListSearchComponent {
  @Input({required: true})
  titleControl!: FormControl<string>;

}
