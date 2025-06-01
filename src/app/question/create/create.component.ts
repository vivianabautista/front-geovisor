import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuestionTypeService, QuestionType } from '../question.service';

@Component({
  selector: 'question-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  form: FormGroup;
  typeQuestion: QuestionType[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private questionTypeService: QuestionTypeService
  ) {
    this.form = this.fb.group({
      question: ['', Validators.required],
      typeChoice: ['', Validators.required],
      options: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuestionTypes();
  }

  loadQuestionTypes(): void {
    this.loading = true;
    this.questionTypeService.getTypes().subscribe(
      (types) => {
        if (Array.isArray(types)) {
          this.typeQuestion = types;
          console.log('Tipos de preguntas:', JSON.stringify(types, null, 2));
          
          // Actualizar valor seleccionado si existe
          const tipoValue = this.form.get('tipo')?.value;
          if (tipoValue) {
            const selectedType = this.typeQuestion.find(t => t.id === Number(tipoValue));
            selectedType && this.form.get('tipo')?.setValue(selectedType.id);
          }
        } else {
          console.error('Datos no son un array');
          this.typeQuestion = [];
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.typeQuestion = [];
        this.loading = false;
      }
    );
  }

  guardar(): void {
    if (!this.form.valid) return console.log('Formulario inválido');

    this.questionTypeService.createQuestion(this.form.value).subscribe(
      (response) => {
        console.log('Pregunta creada:', response);
        this.form.reset();
        this.loadQuestionTypes();
      },
      (error) => console.error('Error:', error)
    );
  }
}
