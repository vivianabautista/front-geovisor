import { Component, OnInit } from '@angular/core';
import { OneComponent } from '../one/one.component';
import { TwoComponent } from '../two/two.component';
import { ThreeComponent } from '../three/three.component';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';
import { AppState } from '../../app-state.service';

@Component({
  selector: 'app-generic',
  imports: [CommonModule, OneComponent, TwoComponent, ThreeComponent ],
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {
  seccionVisible: string | null = null;
  showTwoAndThree = true;
  private appState: AppStateService;

  constructor(appState: AppStateService) {
    this.appState = appState;
  }

  ngOnInit() {
    // Suscribirse a los cambios de estado
    this.appState.getCurrentState().subscribe(state => {
      this.showTwoAndThree = 
        state === AppState.CONSULT || 
        state === AppState.EDIT_FORM;
    });
  }

  mostrar(seccion: string) {
    this.seccionVisible = seccion;
  }

  cerrar() {
    this.seccionVisible = null;
  }
  
}
