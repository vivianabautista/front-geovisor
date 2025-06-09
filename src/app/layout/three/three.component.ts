import { Component } from '@angular/core';
import { CreateQuestionComponent } from '../../question/create/create.component';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../app-state.service';


@Component({
  selector: 'app-three',
  imports: [CommonModule, CreateQuestionComponent],
  templateUrl: './three.component.html',
  styleUrl: './three.component.scss'
})
export class ThreeComponent {


  isCreateQuestionVisible = () => this.appState.isCreateQuestionVisible();
  
  constructor(private appState: AppStateService) {}


 
 
}
