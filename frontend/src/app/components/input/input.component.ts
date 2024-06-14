import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { UserInput } from '../../models/user-input.model';

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
  emotionResult: any;

  apiService = inject(ApiService);

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    const cleanedText = this.stripHtmlTags(this.userInputText.trim());

    console.log('Submitting user input:', cleanedText);

    const newUserInput: UserInput = { text: cleanedText, date: new Date() };

    this.apiService.createUserInput(newUserInput).subscribe(response => {
      console.log('User input created:', response);

      this.apiService.getSentimentEmotions().subscribe(emotionResponse => {
        console.log('Sentiment analysis result:', emotionResponse);
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
