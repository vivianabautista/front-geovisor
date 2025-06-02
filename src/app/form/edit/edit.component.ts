import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormService } from '../form.service';
import { AppStateService, AppState } from '../../app-state.service';

interface Section {
  id: number;
  name: string;
  description: string;
}

interface Form {
  id: number;
  name: string;
  description: string;
  sections: Section[];
}


@Component({
  selector: 'form-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  private formId: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private formService: FormService,
    private appState: AppStateService
  ) {
    // Inicializar el formulario con el array de secciones
    this.form = this.fb.group({
      name: [''],
      description: [''],
      sections: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Suscribirse al servicio para obtener los datos del formulario
    this.formService.getCurrentForm().subscribe(form => {
      if (form) {
        this.formId = form.id;
        this.form.patchValue({
          name: form.name,
          description: form.description
        });

        // Actualizar el array de secciones
        const sectionsArray = this.form.get('sections') as FormArray;
        sectionsArray.clear();
        form.sections?.forEach((section: Section) => {
          sectionsArray.push(this.fb.group({
            id: section.id,
            name: section.name,
            description: section.description
          }));
        });

        // Actualizar el valor del formulario
        this.form.patchValue({
          name: form.name,
          description: form.description,
          sections: form.sections
        });
      }
    });
  }

  eliminarSection(section: any) {
    console.log(section);
  }

  editarSection(section: any) {
    console.log(section);
  }

  guardar() {
    if (!this.formId) {
      alert('No se encontró el ID del formulario');
      return;
    }

    const payload = this.form.value;
    console.log('Actualizando formulario:', payload);

    this.http.put(`http://localhost:8000/form/${this.formId}`, payload).subscribe({
      next: () => {
        alert('Formulario actualizado correctamente');
      },
      error: err => {
        console.error('Error al actualizar:', err);
        alert('Error al actualizar el formulario');
      }
    });
  }
}
