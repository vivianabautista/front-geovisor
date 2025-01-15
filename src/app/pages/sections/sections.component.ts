import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sections',
  imports: [NgOptimizedImage],
  template: `
  ...
  <li>
    Static Image:
    <img ngSrc="https://ethic.es/wp-content/uploads/2023/03/imagen.jpg" alt="Angular logo" width="32" height="32" />
  </li>
  <li>
    Dynamic Image:
    <img [ngSrc]="logoUrl" [alt]="logoAlt" width="32" height="32" />
  </li>
  ...
`,
  // templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss'
})
export class SectionsComponent {
  logoUrl = 'https://ethic.es/wp-content/uploads/2023/03/imagen.jpg';
  logoAlt = 'Angular logo';
  username = 'youngTech';

}
