import { Component, Output, EventEmitter } from '@angular/core';
import { CreateComponent } from '../../form/create/create.component';




@Component({
  selector: 'app-one',
  imports: [CreateComponent],
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss'
})
export class OneComponent {

  @Output() cerrarSeccion = new EventEmitter<void>();

  cerrar() {
    this.cerrarSeccion.emit();
  }

}
