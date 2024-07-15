import {Component, inject} from '@angular/core';
import {StatsComponent} from '../stats/stats.component';
import {Editor, NgxEditorModule, Toolbar} from "ngx-editor";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {UserInput} from "../../models/user-input.model";
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [StatsComponent, NgxEditorModule, FormsModule, NavbarComponent, NgIf, NgClass, NgForOf]
})
export class MainComponent {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);

  editor!: Editor;
  userInputText: string = '';
  postId: number | undefined;
  moreInfoVisible: boolean = false;
  errorMessage: string | undefined;
  emotionData: any[] = [
    {name: 'Sentiment Label', value: 'neutral'},
    {name: 'Sentiment Score', value: 0},
    {name: 'Joy Score', value: 0},
    {name: 'Sadness Score', value: 0},
    {name: 'Anger Score', value: 0},
    {name: 'Fear Score', value: 0},
    {name: 'Disgust Score', value: 0}
  ];

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ]

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

    if (!this.hasMinimumWords(cleanedText, 10)) {
      this.errorMessage = "Input must contain at least 10 words.";
      return;
    }

    this.errorMessage = undefined;

    const newUserInput: UserInput = {text: cleanedText, date: new Date()};

    this.apiService.createUserInput(newUserInput).subscribe(response => {
      console.log(response);
      this.updateEmotionData(response);
    });
  }

  hasMinimumWords(text: string, minWords: number): boolean {
    const wordCount = text.split(/\s+/).filter(word => word.trim().length > 0).length;
    return wordCount >= minWords;
  }

  stripHtmlTags(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }


  showMoreInfo(event: Event) {
    event.preventDefault();
    this.moreInfoVisible = !this.moreInfoVisible;
  }

  updateEmotionData(response: any) {
    this.emotionData = [
      {name: 'Sentiment Label', value: response.sentiment_label},
      {name: 'Sentiment Score', value: (response.sentiment_score * 100).toFixed(2)+ '%'},
      {name: 'Joy Score', value: (response.joy_score * 100).toFixed(2) + '%'},
      {name: 'Sadness Score', value: (response.sadness_score * 100).toFixed(2)+ '%'},
      {name: 'Anger Score', value: (response.anger_score * 100).toFixed(2)+ '%'},
      {name: 'Fear Score', value: (response.fear_score * 100).toFixed(2)+ '%'},
      {name: 'Disgust Score', value: (response.disgust_score * 100).toFixed(2)+ '%'}
    ];
  }

  getEmotionIcon(emotionName: string): string {
    switch (emotionName) {
      case 'Sentiment Label':
        return 'bi bi-activity';
      case 'Sentiment Score':
        return 'bi bi-brilliance';
      case 'Joy Score':
        return 'bi bi-emoji-smile';
      case 'Sadness Score':
        return 'bi bi-emoji-frown';
      case 'Anger Score':
        return 'bi bi-emoji-angry';
      case 'Fear Score':
        return 'bi bi-emoji-astonished';
      case 'Disgust Score':
        return 'bi bi-emoji-expressionless';
      default:
        return 'bi bi-emoji-neutral';
    }
  }
}
