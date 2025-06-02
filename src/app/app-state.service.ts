import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum AppState {
  INITIAL = 'initial',
  CREATE = 'create',
  CONSULT = 'consult',
  EDIT = 'edit'
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private currentState = new BehaviorSubject<AppState>(AppState.INITIAL);

  getCurrentState(): Observable<AppState> {
    return this.currentState.asObservable();
  }

  setState(state: AppState): void {
    console.log('Estado cambiado a:', state);
    this.currentState.next(state);
  }

  isInitialState(): boolean {
    return this.currentState.value === AppState.INITIAL;
  }

  isCreateState(): boolean {
    return this.currentState.value === AppState.CREATE;
  }

  isEditState(): boolean {
    return this.currentState.value === AppState.EDIT;
  }

  isConsultState(): boolean {
    return this.currentState.value === AppState.CONSULT;
  }
}
