import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CreatePostService} from "./data-access/create.post.service";
import {CreatePostFormComponent} from "./ui/create.post.form.component";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CreatePostFormComponent
  ],
  templateUrl: './create.post.component.html',
  providers: [CreatePostService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreatePostComponent {
  protected createPostService = inject(CreatePostService);
}
