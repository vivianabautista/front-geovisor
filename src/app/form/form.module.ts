import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConsultFormComponent } from './consult/consult.component';
import { CreateComponent } from './create/create.component';

import { AboutRoutingModule } from './form-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MockSearchInterceptor } from './services/mock-search.interceptor';


@NgModule({
  declarations: [
      ConsultFormComponent,
      CreateComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class FormModule { }
