import { Component } from '@angular/core';
import { CreateSectionComponent } from '../../section/create/create.component';
import { ConsultQuestionComponent } from '../../question/consult/consult.component';

@Component({
  selector: 'app-two',
  imports: [CreateSectionComponent, ConsultQuestionComponent],
  templateUrl: './two.component.html',
  styleUrl: './two.component.scss'
})
export class TwoComponent {

  optionAddQuestion= false;

    addQuestion() {
      this.optionAddQuestion= true; 
  }

}
