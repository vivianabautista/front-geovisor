import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FormService } from '../../form/form.service';
import { FormItem } from '../../form/form.service';
import { AppStateService, AppState } from '../../app-state.service';
import { Subject } from 'rxjs';

import { SectionService, SectionItem } from '../section.service';

interface QuestionItem {
  id: number;
  question: string;
  options: string;
  typeChoice: {
    id: number;
    name: string;
    description: string;
  };
}

interface Item {
  id: number;
  name: string;
  description: string;
}



@Component({
  selector: 'section-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditSectionComponent implements OnInit {

  private sectionId: number | null = null;
  section: FormGroup;

  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private appState = inject(AppStateService);

  currentFormId: number | null = null;
  searchSectionControl = new FormControl('');
  results = signal<Item[]>([]);
  sectionAdded = new Subject<void>(); // Subject para emitir eventos de adición de sección


  constructor(
    private sectionService: SectionService,
  ) {
    this.section = this.fb.group({
      name: [''],
      description: [''],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Suscribirse al servicio para obtener los datos del formulario
    this.sectionService.getCurrentSection().subscribe(section => {
      if (section) {
        this.sectionId = section.id;
        
        // Hacemos la llamada para obtener la sección completa con preguntas
        this.sectionService.getSectionWithQuestions(section.id).subscribe(sectionData => {
          
          // Actualizar el formulario completo
          const questionsArray = this.section.get('questions') as FormArray;
          questionsArray.clear();
          
          if (sectionData.questions) {
            sectionData.questions.forEach(question => {
              questionsArray.push(this.fb.group({
                id: [question.id],
                question: [question.question],
                options: [question.options],
                typeChoice: this.fb.group({
                  id: [question.typeChoice.id],
                  name: [question.typeChoice.name],
                  description: [question.typeChoice.description]
                })
              }));
            });
          }
          
          // Actualizar los datos básicos
          this.section.patchValue({
            name: sectionData.name,
            description: sectionData.description
          });
        });
      } else {
        console.log("No se recibieron datos en edit component");
      }
    });
  }


  deleteQuestion(question: QuestionItem) {
    if (!this.sectionId) {
      alert('No se encontró el ID de la sección');
      return;
    }


    this.sectionService.deleteQuestion(this.sectionId, question.id).subscribe({
      next: () => {
        // Actualizar el formulario local
        const questions = this.section.get('questions') as FormArray;
        const index = questions.controls.findIndex(q => q.get('id')?.value === question.id);
        if (index !== -1) {
          questions.removeAt(index);
        }
       
      },
      error: (error) => {
        console.error('Error al eliminar la pregunta:', error);
        alert('Error al eliminar la pregunta. Por favor, inténtalo de nuevo.');
      }
    });
  }
  


  updateSection() {
    if (!this.sectionId) {
      alert('No se encontró el ID de la sección');
      return;
    }

    const payload = this.section.value;


    this.http.put(`http://localhost:8000/section/${this.sectionId}/`, payload).subscribe({
      next: () => {
        alert('Sección actualizada');
      },
      error: (err: any) => {
        alert('Error al actualizar la sección');
      }
    });
  }

}