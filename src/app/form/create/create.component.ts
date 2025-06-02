import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppStateService, AppState } from '../../app-state.service';
import { CommonModule } from '@angular/common';
import { FormService, FormItem } from '../form.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface Item {
  id: number;
  name: string;
  description: string;
}


@Component({
  selector: 'form-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private appState: AppStateService
  ) {
    this.form = this.fb.group({
      name: [''],
      description: ['']
    });
  }

    results = signal<Item[]>([]);
      private formService = inject(FormService);
    
  

    editar(item: Item) {
      // Crear un nuevo objeto FormItem
      const formItem: FormItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        sections: []
      };
      
      // Guardar el formulario actual en el servicio
      this.formService.setCurrentForm(formItem);
      // Cambiar al estado de edición
      this.appState.setState(AppState.EDIT);
    }

  guardar() {
    const payload = this.form.value;
    console.log('Formulario:', payload);
    
    if (this.form.valid) {
      this.http.post('http://localhost:8000/form/', payload).subscribe({
        next: (response: any) => {
          this.editar(response);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar el formulario');
        }
      });
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }
}
