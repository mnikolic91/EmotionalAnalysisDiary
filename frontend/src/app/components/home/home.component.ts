import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
