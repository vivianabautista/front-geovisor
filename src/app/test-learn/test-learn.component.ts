import { Component } from '@angular/core';

@Component({
  selector: 'app-test-learn',
  imports: [],
  template: `
   @for (os of operatingSystems; track os.id) {
      {{ os.name }}
    }
      <p>Escribe:</p>
       {{message}}
      <div [contentEditable]="isEditable"></div>
      <section (mouseover)="onMouseOver()">
      <button (click)="greet()">
  `,
  // templateUrl: './test-learn.component.html',
  styleUrl: './test-learn.component.scss'
})
export class TestLearnComponent {
  message = 'Hello, Angular! 🌟';
  operatingSystems = [{ id: 'win', name: 'Windows' }, { id: 'osx', name: 'MacOS' }, { id: 'linux', name: 'Linux' }];
  isEditable = true;
  greet() {
    console.log('Hello, there 👋');
  }
  onMouseOver() {
    this.message = 'Way to go 🚀';
  }

}
