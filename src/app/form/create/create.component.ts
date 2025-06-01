import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'form-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {


   form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  guardar() {
    const payload = this.form.value;
    console.log(payload);
    this.http.post('http://localhost:8000/form/', payload).subscribe({
      next: () => {
        alert('Guardado correctamente');
        // cerrar este componente y abrir el de editar
      },
      error: err => {
      
        console.error('Error al guardar', err);
        alert('Error al guardar el formulario');
      }
    });
  }
}
