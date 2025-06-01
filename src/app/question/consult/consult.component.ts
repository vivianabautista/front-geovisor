import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Item {
  question: string;
  type: string;
  options: string;
}


@Component({
  selector: 'question-consult',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultQuestionComponent implements OnInit {

private http = inject(HttpClient);

  searchControl = new FormControl('');
  results = signal<Item[]>([]);



  ngOnInit(): void {
    // Escucha los cambios del input
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.search(term ?? ''));

    // Primera búsqueda con término vacío
    this.search('');
  }


  search(term: string) {
    this.http.get<Item[]>(`http://localhost:8000/question/${term}`).subscribe({
      next: data => this.results.set(data),
      error: err => console.error('Error al buscar', err)
    });
  }
}
