import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSectionComponent } from '../../section/create/create.component';
import { ConsultQuestionComponent } from '../../question/consult/consult.component';
import { AppStateService, AppState } from '../../app-state.service';
import { EditSectionComponent } from '../../section/edit/edit.component';

@Component({
  selector: 'app-two',
  imports: [CommonModule, CreateSectionComponent, ConsultQuestionComponent, EditSectionComponent],
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent {

  isEditSectionVisible = () => this.appState.isEditSectionVisible();
  isCreateSectionVisible = () => this.appState.isCreateSectionVisible();

  
  constructor(private appState: AppStateService) {}

  optionAddQuestion = false;

  addQuestion() {
    this.optionAddQuestion = true;
  }

  editarSection() {
    this.appState.setState(AppState.EDIT_SECTION);
  }
}
