import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-one',
  imports: [],
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss'
})
export class OneComponent {

  @Output() cerrarSeccion = new EventEmitter<void>();

  cerrar() {
    this.cerrarSeccion.emit();
  }

}
