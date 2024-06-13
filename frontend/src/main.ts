import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app-routes";
import { HttpClientModule } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, NgxEditorModule, FormsModule, HttpClientModule),
    provideRouter(appRoutes)]
})
  .catch(err => console.error(err));
