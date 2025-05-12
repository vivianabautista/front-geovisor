import { Component } from '@angular/core';
import { OneComponent } from '../one/one.component';
import { TwoComponent } from '../two/two.component';
import { ThreeComponent } from '../three/three.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-generic',
  imports: [CommonModule, OneComponent, TwoComponent, ThreeComponent ],
  templateUrl: './generic.component.html',
  styleUrl: './generic.component.scss'
})
export class GenericComponent {
  seccionVisible: string | null = null;

  mostrar(seccion: string) {
    this.seccionVisible = seccion;
  }

  cerrar() {
    this.seccionVisible = null;
  }
  
}
