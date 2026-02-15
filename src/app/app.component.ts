import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HomePageComponent]
})
export class AppComponent {
  title = 'Shopping App';

  constructor() {
  }
}
