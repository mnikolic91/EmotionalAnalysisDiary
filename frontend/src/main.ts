import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {FormsModule} from '@angular/forms';
import {NgxEditorModule} from 'ngx-editor';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app/app-routes";


bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, NgxEditorModule, FormsModule),
    provideRouter(appRoutes)]
})
  .catch(err => console.error(err));
