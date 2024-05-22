import {Component, OnDestroy, OnInit} from '@angular/core';
import { Editor, NgxEditorModule } from "ngx-editor";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
