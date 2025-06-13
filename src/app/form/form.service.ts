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
    console.log("Formulario observador:",  this.currentForm.getValue());
    return this.currentForm.asObservable();
  }

  get sectionAdded$() {
    return this.sectionAdded.asObservable();
  }

  emitSectionAdded() {
    // Obtener el valor actual del formulario directamente, sin suscribirse
  const form = this.currentForm.getValue();
    if (form && form.id) {
      this.http.get<FormItem>(`http://localhost:8000/form/${form.id}/`).subscribe(updatedForm => {
        this.setCurrentForm(updatedForm);
      });
    }
  }

  setCurrentForm(form: FormItem) {
    console.log("Formulario actualizado:", form);
    this.currentForm.next(form);
  }

 
}
