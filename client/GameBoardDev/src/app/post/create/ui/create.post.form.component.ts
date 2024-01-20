import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {ValidationResult} from "../../../shared/interfaces/validate/validate";
import {CreatePostStatus} from "../../interfaces/create.post.state";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {FormErrorComponent} from "../../../shared/components/form-error/form-error.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CreatePostDTO} from "../../interfaces/post";

@Component({
  selector: 'app-create-post-form',
  standalone: true,
  imports: [
    FormErrorComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  templateUrl: './create.post.form.component.html'
})
export class CreatePostFormComponent {
  private fb = inject(FormBuilder);
  protected CreatePostStatus = CreatePostStatus;
  protected Editor = ClassicEditor;
  protected editorConfig = {
    placeholder: 'Treść'
  }

  status = input.required<CreatePostStatus>();
  validationResult =  input<ValidationResult | undefined>();

  @Output()
  createPost = new EventEmitter<CreatePostDTO>();

  createPostForm = this.fb.nonNullable.group({
    title: [''],
    content: ['']
  });

  handleSubmit() {
    if (this.createPostForm.valid) {
      this.createPost.emit(this.createPostForm.getRawValue());
    }
  }
}
