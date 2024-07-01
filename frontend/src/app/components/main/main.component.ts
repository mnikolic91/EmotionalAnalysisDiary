import {Component, inject} from '@angular/core';
import {PostsComponent} from '../posts/posts.component';
import {Editor, NgxEditorModule} from "ngx-editor";
import {BarChartModule, PieChartModule} from "@swimlane/ngx-charts";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {UserInput} from "../../models/user-input.model";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [PostsComponent, NgxEditorModule, PieChartModule, FormsModule, BarChartModule, NavbarComponent, NgIf]
})
export class MainComponent {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);

  editor!: Editor;
  userInputText: string = '';
  postId: number | undefined;
  sentimentData: any[] = [];
  emotionData: any[] = [];
  sentimentLabel: string | undefined;


  colorScheme = 'forest';
  showLegend = false;
  showLabels = true;

  ngOnInit(): void {
    this.editor = new Editor();

    this.route.params.subscribe(params => {
      this.postId = +params['postId'];
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    const cleanedText = this.stripHtmlTags(this.userInputText.trim());

    const newUserInput: UserInput = {text: cleanedText, date: new Date()};

    this.apiService.createUserInput(newUserInput).subscribe(response => {
      console.log(response);
      this.updateChartData(response);

    });
  }

  stripHtmlTags(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }

  updateChartData(response: any) {
    this.emotionData = [
      {name: 'Sentiment Score', value: response.sentiment_score},
      {name: 'Joy Score', value: response.joy_score},
      {name: 'Sadness Score', value: response.sadness_score},
      {name: 'Anger Score', value: response.anger_score},
      {name: 'Fear Score', value: response.fear_score},
      {name: 'Disgust Score', value: response.disgust_score}
    ];

    this.sentimentData = [
      {name: 'Sentiment Score', value: response.sentiment_score}
    ];
    this.sentimentLabel = response.sentiment_label;


  }
}
