import { Component, Output, EventEmitter } from '@angular/core';
import { ConsultFormComponent } from '../../form/consult/consult.component';
import { CreateComponent } from '../../form/create/create.component';
import { EditComponent } from '../../form/edit/edit.component';
import { ConsultSectionComponent } from '../../section/consult/consult.component';



@Component({
  selector: 'app-one',
  imports: [ ConsultFormComponent, CreateComponent, EditComponent, ConsultSectionComponent ],
  templateUrl: './one.component.html',
  styleUrl: './one.component.scss'
})
export class OneComponent {

  optionAddForm = false; 
  optionAddSection= false;

  @Output() cerrarSeccion = new EventEmitter<void>();

  cerrar() {
    this.cerrarSeccion.emit();
  }
  
  openCreate() {
      this.optionAddForm = true; 
  }

   addSection() {
      this.optionAddSection= true; 
  }

}
