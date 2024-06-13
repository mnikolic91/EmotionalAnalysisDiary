import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Editor, NgxEditorModule} from "ngx-editor";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ApiService} from "../../services/api.service";
import {UserInput} from "../../models/user-input.model";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [NgxEditorModule, ReactiveFormsModule, FormsModule]
})
export class InputComponent implements OnInit, OnDestroy {
  editor!: Editor;
  html = '';
  userInputText!: string;

  apiService = inject(ApiService)

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  onSubmit() {
    const newUserInput: UserInput = {text: this.userInputText, date: new Date()};
    this.apiService.createUserInput(newUserInput).subscribe(response => {
      console.log('User input created:', response);
    });
  }
}
