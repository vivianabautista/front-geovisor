import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppStateService, AppState } from '../../app-state.service';
import { CommonModule } from '@angular/common';
import { ConsultFormComponent } from '../../form/consult/consult.component';
import { CreateComponent } from '../../form/create/create.component';
import { EditComponent } from '../../form/edit/edit.component';
import { ConsultSectionComponent } from '../../section/consult/consult.component';

@Component({
  selector: 'app-one',
  standalone: true,
  imports: [
    CommonModule,
    ConsultFormComponent,
    CreateComponent,
    EditComponent,
    ConsultSectionComponent
  ],
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {
  @Output() cerrarSeccion = new EventEmitter<void>();
  
  // Exponer métodos del AppStateService para usarlos en la plantilla
  isInitialState = () => this.appState.isInitialState();
  isCreateState = () => this.appState.isCreateState();
  isConsultState = () => this.appState.isConsultState();
  isEditState = () => this.appState.isEditState();

  constructor(private appState: AppStateService) {
    // Inicializar el estado
    this.appState.setState(AppState.INITIAL);
  }

  ngOnInit(): void {
    // Asegurarnos de que el estado está inicializado
    console.log('Estado inicial:', this.appState.getCurrentState());
  }

  openCreate(): void {
    // Cambiar al estado de creación
    console.log('Cambiando a estado CREATE');
    this.appState.setState(AppState.CREATE);
  }

  addSection(): void {
    // Cambiar al estado de consulta
    console.log('Cambiando a estado CONSULT');
    this.appState.setState(AppState.CONSULT);
  }

  cerrar(): void {
    this.cerrarSeccion.emit();
  }
}
