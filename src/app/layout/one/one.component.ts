import { Component, Output, EventEmitter } from '@angular/core';
import { ConsultFormComponent } from '../../form/consult/consult.component';




@Component({
  selector: 'app-one',
  imports: [ ConsultFormComponent],
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss'
})
export class OneComponent {

  @Output() cerrarSeccion = new EventEmitter<void>();

  cerrar() {
    this.cerrarSeccion.emit();
  }

}
