import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VideogameService } from '../videogame/videogame.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { VideogameEventService } from '../videogame/videogame-event.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-videogame-form-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],

  templateUrl: './videogame-form-dialog.component.html',
  styleUrl: './videogame-form-dialog.component.css',
})
export class VideogameFormDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  constructor() {}
  private dialog = inject(MatDialogRef<VideogameFormDialogComponent>);
  private service = inject(VideogameEventService);

  ngOnDestroy(): void {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      titleVideogame: new FormControl(''),
      priceVideogame: new FormControl(),
      descVideogame: new FormControl(''),
      releaseDateVideogame: new FormControl<Date | null>(null),
    });
  }

  save() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      this.service.saveVideogame(this.form.value);
      this.dialog.close();
    }
  }

  reset() {
    this.form.reset();
  }
}
