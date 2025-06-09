import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum AppState {
  INITIAL = 'initial', // ConsultarForm
  CREATE = 'create',  // CrearForm
  CONSULT = 'consult', // ConsultarSeccion
  EDIT_FORM = 'edit_form',      // EditarForm
  EDIT_SECTION = 'edit_section', // EditarSeccion
  CREATE_SECTION = 'create_section', // CrearSeccion
  CREATE_QUESTION = 'create_question' // CrearPregunta
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private currentState = new BehaviorSubject<AppState>(AppState.INITIAL);

  // Método privado para verificar estados
  private checkState(...states: AppState[]): boolean {
    return states.includes(this.currentState.value);
  }

  getCurrentState(): Observable<AppState> {
    return this.currentState.asObservable();
  }

  setState(state: AppState): void {
    console.log('Estado cambiado a:', state);
    this.currentState.next(state);
  }

  // Métodos de verificación de estados
  isInitialState(): boolean {
    return this.checkState(AppState.INITIAL);
  }

  isCreateState(): boolean {
    return this.checkState(AppState.CREATE);
  }

  isEditFormState(): boolean {
    return this.checkState(AppState.EDIT_FORM, AppState.EDIT_SECTION);
  }

  isConsultState(): boolean {
    return this.checkState(AppState.CONSULT);
  }

  // Métodos de visibilidad
  isConsultFormVisible(): boolean {
    return this.isInitialState();
  }

  isCreateFormVisible(): boolean {
    return this.isCreateState();
  }

  isConsultSectionVisible(): boolean {
    return this.isConsultState();
  }

  isEditFormVisible(): boolean {
    if (this.checkState(AppState.CREATE_SECTION)) {
      return true;
    }
    if (this.checkState(AppState.EDIT_FORM)) {
      return true;
    }
    if (this.checkState(AppState.EDIT_SECTION)) {
      return true;
    }
    return false;
  }

  isEditSectionVisible(): boolean {
    return this.checkState(AppState.EDIT_SECTION);
  }

  isCreateSectionVisible(): boolean {
    return this.checkState(AppState.CREATE_SECTION);
  }

  isCreateQuestionVisible(): boolean {
    return this.checkState(AppState.CREATE_QUESTION);
  }
}
