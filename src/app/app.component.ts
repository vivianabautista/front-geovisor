import { Component, inject } from '@angular/core';
import { TestLearnComponent } from './test-learn/test-learn.component';
import { MapsComponent } from './maps/maps.component';
import { SectionsComponent } from './pages/sections/sections.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { CarService } from './services/car.service';
import { GenericComponent } from './layout/generic/generic.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestLearnComponent, MapsComponent, SectionsComponent, RouterLink, FormsComponent, GenericComponent],
  template: `
  <nav>
    <a routerLink="/">Home</a>
    <a routerLink="/about">User</a>
      
    </nav>
     <router-outlet />
    @if (isServerRunning) {
 Welcome to {{ title }}!

      <app-generic></app-generic>

      <app-forms></app-forms>
     
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
  display = '';

  title = 'angular-poc';
  isServerRunning = true;

  je = 0;
  greet() {
    console.log('Hello, there 👋');
  }

  addItem(count: number) {
    this.je = count;
  }

  constructor(private carService: CarService) {
    this.display = this.carService.getCars().join(' ⭐️ ');
  }

}
