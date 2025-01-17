import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-forms',
  imports: [FormsModule, ReactiveFormsModule],
  template:  `
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


}
