import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TestLearnComponent } from './test-learn/test-learn.component';

@Component({
  selector: 'app-root',
  imports: [TestLearnComponent],
  template: `
    @if (isServerRunning) {
      <app-test-learn></app-test-learn>

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

  greet() {
    console.log('Hello, there 👋');
  }

}
