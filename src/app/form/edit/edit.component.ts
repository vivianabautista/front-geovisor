import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormService } from '../form.service';
import { AppStateService, AppState } from '../../app-state.service';
import { FormItem } from '../form.service';
import { SectionItem, SectionService } from '../../section/section.service';


interface Section {
  id: number;
  name: string;
  description: string;
}

// Usar la interfaz FormItem del servicio
export type Form = FormItem;


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
  private sectionAddedSubscription: { unsubscribe: () => void } | null = null;
  private sectionService = inject(SectionService);

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
        this.updateForm(form);
      }
    });

    // Suscribirse al evento de adición de sección
    this.sectionAddedSubscription = this.formService.sectionAdded$.subscribe(() => {
      // El formulario se actualizará automáticamente cuando se emita el evento
      // ya que el FormService actualiza el BehaviorSubject
    });
  }

  private updateForm(form: FormItem) {
    const sectionsArray = this.form.get('sections') as FormArray;
    sectionsArray.clear();
    
    // Crear un nuevo array de grupos para las secciones
    const newSections = form.sections?.map(section => 
      this.fb.group({
        id: section.id,
        name: section.name,
        description: section.description
      })
    ) || [];

    // Agregar todas las secciones al array
    newSections.forEach(sectionGroup => sectionsArray.push(sectionGroup));

    // Actualizar el formulario completo
    this.form.patchValue({
      name: form.name,
      description: form.description,
      sections: form.sections
    });
  }

  deleteSection(section: Section) {
    if (!this.formId) {
      console.error('No se encontró el ID del formulario');
      return;
    }

    const url = `http://localhost:8000/form/${this.formId}/section/${section.id}/`;
    this.http.delete(url).subscribe({
      next: () => {
        this.formService.emitSectionAdded();
      },
      error: (err: any) => {
        console.error('Error al eliminar sección:', err);
        alert('Error al eliminar la sección del formulario');
      }
    });
  }

  editSection(section: SectionItem) {
    // Guardar el formulario actual en el servicio
    this.sectionService.setCurrentSection(section);
    this.appState.setState(AppState.EDIT_SECTION);
  }

  ngOnDestroy() {
    // Limpiar la suscripción al evento de adición de sección
    if (this.sectionAddedSubscription) {
      this.sectionAddedSubscription.unsubscribe();
    }
  }

  guardar() {
    if (!this.formId) {
      alert('No se encontró el ID del formulario');
      return;
    }

    const payload = this.form.value;

    this.http.put(`http://localhost:8000/form/${this.formId}/`, payload).subscribe({
      next: () => {
        // Actualizar el formulario en el servicio
        this.formService.setCurrentForm(payload);
      },
      error: (err: any) => {
        console.error('Error al actualizar:', err);
        alert('Error al actualizar el formulario');
      }
    });
  }
}
