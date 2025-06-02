import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ConsultQuestionComponent } from './consult/consult.component';
import { CreateQuestionComponent } from './create/create.component';

import { AboutRoutingModule } from './question-routing.module';


@NgModule({
  declarations: [
      ConsultQuestionComponent,
      CreateQuestionComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
