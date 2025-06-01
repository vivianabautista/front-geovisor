import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Item {
  name: string;
  description: string;
}

@Component({
  selector: 'section-consult',
    standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consult.component.html',
  styleUrl: './consult.component.scss'
})
export class ConsultSectionComponent implements OnInit {
  private http = inject(HttpClient);

  searchSectionControl = new FormControl('');
  results = signal<Item[]>([]);


  ngOnInit(): void {
    // Escucha los cambios del input
    this.searchSectionControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.searchSection(term ?? ''));

    // Primera búsqueda con término vacío
    this.searchSection('');
  }



  searchSection(term: string) {
    this.http.get<Item[]>(`http://localhost:8000/section/${term}`).subscribe({
      next: data => this.results.set(data),
      error: err => console.error('Error al buscar', err)
    });
  }
}
