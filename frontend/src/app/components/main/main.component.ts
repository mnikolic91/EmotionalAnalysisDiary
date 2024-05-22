import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { PostsComponent } from '../posts/posts.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    standalone: true,
    imports: [PostsComponent, InputComponent]
})
export class MainComponent {

}
