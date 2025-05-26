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
  selector: 'form-consult',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultFormComponent implements OnInit {
 private http = inject(HttpClient);

  searchControl = new FormControl('');
  results = signal<Item[]>([]);

  ngOnInit(): void {
    // Escucha los cambios del input
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.buscar(term ?? ''));

    // Primera búsqueda con término vacío
    this.buscar('');
  }

  buscar(term: string) {
    this.http.get<Item[]>(`http://localhost:8000/form/${term}`).subscribe({
      next: data => this.results.set(data),
      error: err => console.error('Error al buscar', err)
    });
  }
}