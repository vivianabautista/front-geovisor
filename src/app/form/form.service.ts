import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export interface FormItem {
  id: number;
  name: string;
  description: string;
  sections: {
    id: number;
    name: string;
    description: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class FormService {
  private http = inject(HttpClient);
  private currentForm = new BehaviorSubject<FormItem | null>(null);
  private sectionAdded = new Subject<void>();

  getCurrentForm() {
    return this.currentForm.asObservable();
  }

  get sectionAdded$() {
    return this.sectionAdded.asObservable();
  }

  emitSectionAdded() {
    // Actualizar el formulario actual
    this.getCurrentForm().subscribe(form => {
      if (form && form.id) {
        // Obtener el formulario actualizado del backend
        this.http.get<FormItem>(`http://localhost:8000/form/${form.id}`).subscribe(updatedForm => {
          this.setCurrentForm(updatedForm);
        });
      }
    });
  }

  setCurrentForm(form: FormItem) {
    this.currentForm.next(form);
  }

  clearCurrentForm() {
    this.currentForm.next(null);
  }
}
