import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TestLearnComponent } from './test-learn/test-learn.component';
import { MapsComponent } from './maps/maps.component';
import { SectionsComponent } from './pages/sections/sections.component';

@Component({
  selector: 'app-root',
  imports: [TestLearnComponent, MapsComponent, SectionsComponent],
  template: `
    @if (isServerRunning) {
    <h1>
        Welcome to {{ je }}!
      </h1>
      <app-test-learn cositas='cositas'   (countEvent)="addItem($event)"></app-test-learn>
<app-maps></app-maps>
<app-sections></app-sections>
    }
    @else {
      <h1>
        Welcome to {{ title }}!
      </h1>
    }
  `,
  // templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-poc';
  isServerRunning = true;

  je = 0;
  greet() {
    console.log('Hello, there 👋');
  }

  addItem(count: number) {
    this.je = count;
  }

}
