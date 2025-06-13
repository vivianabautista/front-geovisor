import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SectionService } from '../../section/section.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface TypeChoice {
  id: number;
  name: string;
  description: string;
}

interface Item {
  id: number;
  question: string;
  options: string;
  typeChoice: TypeChoice;
}


@Component({
  selector: 'question-consult',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultQuestionComponent implements OnInit {

  private http = inject(HttpClient);
  private sectionService = inject(SectionService);
  private sectionId: number | null = null;

  constructor() {
    // Obtener el ID de la sección activa
    this.sectionService.getCurrentSection().subscribe(section => {
      if (section) {
        this.sectionId = section.id;
      }
    });
  }

  addQuestionToSection(questionId: number) {
    if (!this.sectionId) {
      console.error('No se ha seleccionado una sección');
      return;
    }

    this.sectionService.addQuestionToSection(this.sectionId, questionId)
      .subscribe({
        next: () => {
        },
        error: (error: any) => {
          alert('Error al agregar la pregunta');
        }
      });

    // Suscribirse al evento de actualización de sección
    this.sectionService.sectionAdded$.subscribe(() => {
    });
  }

  searchControl = new FormControl('');
  results: Item[] = [];
  loading = false;

  ngOnInit(): void {
    // Escucha los cambios del input
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.search(term ?? ''));

    // Primera búsqueda con término vacío
    this.search('');
    
  }


  search(term: string) {
    this.loading = true;
    this.http.get<Item[]>(`http://localhost:8000/question/${term}`).subscribe({
      next: data => {
        this.results = data;
        this.loading = false;
      },
      error: err => {
        this.results = [];
        this.loading = false;
      }
    });
  }
}
