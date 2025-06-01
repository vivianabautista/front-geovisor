import { Component, inject } from '@angular/core';
import { GenericComponent } from './layout/generic/generic.component';


@Component({
  selector: 'app-root',
  imports: [ GenericComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {



}
