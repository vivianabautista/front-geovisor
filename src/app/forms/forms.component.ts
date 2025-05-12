import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
 import { OneComponent } from '../layout/one/one.component';
 import { TwoComponent } from '../layout/two/two.component';
 import { ThreeComponent } from '../layout/three/three.component';

@Component({
  selector: 'app-forms',
  imports: [FormsModule, ReactiveFormsModule,OneComponent, TwoComponent, ThreeComponent ],
  template:  `

 
<h1>  Forms</h1>
<hr>
   <h1>  Forms</h1>
 <p>Username: {{ username }}</p>
    <p>{{ username }}'s favorite framework: {{ favoriteFramework }}</p>
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
        <button (click)="showFramework()">Show Framework</button>

        <hr>
        <h1> Reactive Forms</h1>




       <form
  [formGroup]="profileForm"
  (ngSubmit)="handleSubmit()">
  <label>
    Name
    <input type="text" formControlName="name" />
  </label>
  <label>
    Email
    <input type="email" formControlName="email" />
  </label>
  <button type="submit" [disabled]="!profileForm.valid">Submit</button>
</form>

<h2>Profile Form</h2>
<p>Name: {{ profileForm.value.name }}</p>
<p>Email: {{ profileForm.value.email }}</p>
      <hr>
`,
  // templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  favoriteFramework = '';
  username = 'youngTech';
  showFramework() {
    alert(this.favoriteFramework);
  }


  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });


  handleSubmit() {
    alert(
      this.profileForm.value.name + ' | ' + this.profileForm.value.email
    );
  }

  seccionVisible: string | null = null;

  mostrar(seccion: string) {
    this.seccionVisible = seccion;
  }

  cerrar() {
    this.seccionVisible = null;
  }


}
