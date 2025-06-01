import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuestionType {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class QuestionTypeService {
  constructor(private http: HttpClient) {}

  getTypes(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>('http://localhost:8000/question-type/');
  }

  createQuestion(question: QuestionType): Observable<QuestionType> {
    return this.http.post<QuestionType>('http://localhost:8000/question/', question);
  }
}