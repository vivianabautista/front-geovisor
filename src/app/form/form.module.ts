import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppStateService } from '../app-state.service';

import { ConsultFormComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';

import { AboutRoutingModule } from './form-routing.module';

@NgModule({
  declarations: [
      ConsultFormComponent,
      CreateComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AppStateService]
})
export class FormModule { }
