import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private currentForm = new BehaviorSubject<FormItem | null>(null);

  getCurrentForm() {
    return this.currentForm.asObservable();
  }

  setCurrentForm(form: FormItem) {
    this.currentForm.next(form);
  }

  clearCurrentForm() {
    this.currentForm.next(null);
  }
}
