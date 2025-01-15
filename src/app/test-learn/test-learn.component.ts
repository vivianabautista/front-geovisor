import {Component, Input, Output, EventEmitter} from '@angular/core';

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
      <button (click)="greet()"> </button>
      <p>{{cositas}}</p>
  `,
  // templateUrl: './test-learn.component.html',
  styleUrl: './test-learn.component.scss'
})
export class TestLearnComponent {

  @Input() cositas = '';

  @Output() countEvent = new EventEmitter<number>();

  message = 'Hello, Angular! 🌟';
  count = 0;
  operatingSystems = [{ id: 'win', name: 'Windows' }, { id: 'osx', name: 'MacOS' }, { id: 'linux', name: 'Linux' }];
  isEditable = true;
  greet() {
    console.log('Hello, there 👋');
    this.count++;
    this.countEvent.emit(this.count);
  }
  onMouseOver() {
    this.message = 'Way to go 🚀';
  }

}
