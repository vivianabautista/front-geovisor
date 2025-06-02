import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormStateService {
  private formState = new BehaviorSubject<'consult' | 'create'>('consult');

  get currentForm$() {
    return this.formState.asObservable();
  }

  switchToCreate() {
    this.formState.next('create');
  }

  switchToConsult() {
    this.formState.next('consult');
  }
}
