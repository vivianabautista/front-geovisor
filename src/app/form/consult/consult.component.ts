import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AppStateService, AppState } from '../../app-state.service';
import { FormService } from '../form.service';

interface Section {
  id: number;
  name: string;
  description: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  sections: Section[];
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
  private appState = inject(AppStateService);
  private formService = inject(FormService);

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

  editForm(item: Item) {
    // Guardar el formulario actual en el servicio
    this.formService.setCurrentForm(item);
    // Cambiar al estado de edición
    this.appState.setState(AppState.EDIT_FORM);
  }

  buscar(term: string) {
    this.http.get<Item[]>(`http://localhost:8000/form/${term}`).subscribe({
      next: data => this.results.set(data),
      error: err => console.error('Error al buscar', err)
    });
  }
}