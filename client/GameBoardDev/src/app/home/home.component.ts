import {Component} from '@angular/core';
import {PostComponent} from "../post/post.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostComponent
  ],
  templateUrl: './home.component.html'
})
export default class HomeComponent {

}
