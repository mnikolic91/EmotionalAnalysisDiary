import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserInput } from '../../models/user-input.model';
import { SentimentEmotion } from "../../models/sentiment-emotion.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [NgxEditorModule, ReactiveFormsModule, FormsModule]
})
export class InputComponent implements OnInit, OnDestroy {
  editor!: Editor;
  userInputText: string = '';
  emotionResult: SentimentEmotion[] = [];
  postId: number | undefined;

  @Output() postIdChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

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

    const newUserInput: UserInput = { text: cleanedText, date: new Date() };

    this.apiService.createUserInput(newUserInput).subscribe(response => {
      this.postIdChange.emit(response.id);

      this.apiService.getSentimentEmotions(response.id).subscribe(emotionResponse => {
        this.emotionResult = emotionResponse;
      }, emotionError => {
        console.error('Error getting sentiment emotions:', emotionError);
      });
    }, error => {
      console.error('Error creating user input:', error);
    });
  }

  stripHtmlTags(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }
}
