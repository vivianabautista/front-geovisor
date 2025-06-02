import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ConsultSectionComponent } from './consult/consult.component';
import { CreateSectionComponent } from './create/create.component';

import { AboutRoutingModule } from './section-routing.module';


@NgModule({
  declarations: [
      ConsultSectionComponent,
      CreateSectionComponent
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
