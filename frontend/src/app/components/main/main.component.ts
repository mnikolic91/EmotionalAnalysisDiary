import {Component} from '@angular/core';
import {InputComponent} from '../input/input.component';
import {PostsComponent} from '../posts/posts.component';
import {InputStatsComponent} from "../input-stats/input-stats.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [PostsComponent, InputComponent, InputStatsComponent]
})
export class MainComponent {

  currentPostId: number | undefined;

  handlePostIdChange(postId: number) {
    this.currentPostId = postId;
  }

}
