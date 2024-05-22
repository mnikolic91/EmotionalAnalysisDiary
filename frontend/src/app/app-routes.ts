import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: MainComponent
  }
];

