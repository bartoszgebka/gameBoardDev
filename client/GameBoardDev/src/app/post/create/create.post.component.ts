import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {CreatePostService} from "./data-access/create.post.service";
import {CreatePostFormComponent} from "./ui/create.post.form.component";
import {CreatePostStatus} from "../interfaces/create.post.state";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  private route = inject(Router);
  private matSnackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const status = this.createPostService.status();
      if (status === CreatePostStatus.SUCCESS) {
        this.matSnackBar.open("Pomyślnie dodano nowy post", "Zamknij");
        this.route.navigate(['home']);
      }
    });
  }
}
