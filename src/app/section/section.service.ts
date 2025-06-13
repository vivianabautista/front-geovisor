import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

export interface SectionItem {
  id: number;
  name: string;
  description: string;
  questions: {
    id: number;
    question: string;
    options: string;
    typeChoice: {
      id: number;
      name: string;
      description: string;
    };
  }[];
}

@Injectable({ providedIn: 'root' })
export class SectionService {
  private http = inject(HttpClient);
  private currentSection = new BehaviorSubject<SectionItem | null>(null);
  private sectionAdded = new Subject<void>();

  getSectionWithQuestions(sectionId: number) {
    return this.http.get<SectionItem>(`http://localhost:8000/section/${sectionId}`);
  }

  getCurrentSection() {
    return this.currentSection.asObservable();
  }

  get sectionAdded$() {
    return this.sectionAdded.asObservable();
  }

  emitSectionAdded() {
    this.sectionAdded.next();
  }

  addQuestionToSection(sectionId: number, questionId: number) {
    return this.http.post(`http://localhost:8000/section/${sectionId}/question/${questionId}/`, {})
      .pipe(
        tap({
          next: () => {
            // Obtener el sectionulario actualizado del backend
            this.http.get<SectionItem>(`http://localhost:8000/section/${sectionId}/`).subscribe(updatedSection => {
              this.setCurrentSection(updatedSection);
              this.emitSectionAdded();
            });
          },
          error: (error) => {
            console.error('Error al agregar la pregunta:', error);
          }
        })
      );
  }

  setCurrentSection(section: SectionItem) {
    this.currentSection.next(section);
  }

  clearCurrentSection() {
    this.currentSection.next(null);
  }

  deleteQuestion(sectionId: number, questionId: number) {
    return this.http.delete(`http://localhost:8000/section/${sectionId}/question/${questionId}/`)
      .pipe(
        tap({
          next: () => {
            // Obtener el sectionulario actualizado del backend
            this.http.get<SectionItem>(`http://localhost:8000/section/${sectionId}/`).subscribe(updatedSection => {
              this.setCurrentSection(updatedSection);
              this.emitSectionAdded();
            });
          },
          error: (error) => {
            console.error('Error al eliminar la pregunta:', error);
          }
        })
      );
  }
}
