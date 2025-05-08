import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VideogameEventService } from '../videogame/videogame-event.service';

@Component({
  selector: 'app-videogame-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './videogame-form-dialog.component.html',
  styleUrl: './videogame-form-dialog.component.css',
})
export class VideogameFormDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private dialog = inject(MatDialogRef<VideogameFormDialogComponent>);
  private service = inject(VideogameEventService);

  ngOnInit() {
    this.form = new FormGroup({
      titleVideogame: new FormControl(''),
      priceVideogame: new FormControl(),
      descVideogame: new FormControl(''),
      releaseDateVideogame: new FormControl<Date | null>(null),
    });
  }

  ngOnDestroy(): void {}

  save() {
    if (this.form.valid) {
      this.service.saveVideogame(this.form.value);
      this.dialog.close();
    }
  }

  reset() {
    this.form.reset();
  }
}
