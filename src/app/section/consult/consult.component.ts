import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../form/form.service';
import { FormItem } from '../../form/form.service';
import { AppStateService, AppState } from '../../app-state.service';
import { Subject } from 'rxjs';

interface Item {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'section-consult',
    standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultSectionComponent implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private appState = inject(AppStateService);

  currentFormId: number | null = null;
  form: FormGroup;
  searchSectionControl = new FormControl('');
  results = signal<Item[]>([]);
  sectionAdded = new Subject<void>(); // Subject para emitir eventos de adición de sección


  constructor() {
    // Inicializar el formulario
    this.form = this.fb.group({
      name: [''],
      description: ['']
    });

    // Suscribirse al formulario activo
    this.formService.getCurrentForm().subscribe((form: any) => {
  
      if (form) {
        this.currentFormId = form.id;
      }
    });
  }

  ngOnInit(): void {
    // Escucha los cambios del input
    this.searchSectionControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => this.searchSection(term ?? ''));

    // Primera búsqueda con término vacío
    this.searchSection('');
  }

  editar(item: Item) {
    console.log(item);
  }

  addSection(item: Item) {
    if (!this.currentFormId) {
      alert('No hay un formulario seleccionado');
      return;
    }

    const url = `http://localhost:8000/form/${this.currentFormId}/section/${item.id}/`;
    this.http.post(url, {}).subscribe({
      next: () => {
        this.formService.emitSectionAdded();
      },
      error: (err: any) => {
        console.error('Error al agregar sección:', err);
        alert('Error al agregar la sección al formulario');
      }
    });
  }


  searchSection(term: string) {
    this.http.get<Item[]>(`http://localhost:8000/section/${term}`).subscribe({
      next: data => this.results.set(data),
      error: err => console.error('Error al buscar', err)
    });
  }
}
