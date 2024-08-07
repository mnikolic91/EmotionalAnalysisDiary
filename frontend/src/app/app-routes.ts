import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {HomeComponent} from "./components/home/home.component";
import {AboutComponent} from "./components/about/about.component";
import {StatsComponent} from "./components/stats/stats.component";

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'input',
    component: MainComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
    {
    path: 'about',
    component: AboutComponent
  },
      {
    path: 'stats',
    component: StatsComponent
  }
];

