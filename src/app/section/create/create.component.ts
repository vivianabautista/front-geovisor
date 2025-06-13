import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'section-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateSectionComponent {


   form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    });
  }

  save() {
    const payload = this.form.value;
    this.http.post('http://localhost:8000/section/', payload).subscribe({
      next: () => {
        alert('Guardado correctamente');
        // cerrar este componente y abrir el de editar
      },
      error: err => {
      
        console.error('Error al guardar', err);
        alert('Error al guardar la sección');
      }
    });
  }

}
