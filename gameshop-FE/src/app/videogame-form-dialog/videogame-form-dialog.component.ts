import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { VideogameService } from '../service/videogame/videogame.service';
import { Platform } from '../model/platform';
import { MatSelectModule } from '@angular/material/select';

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
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './videogame-form-dialog.component.html',
  styleUrl: './videogame-form-dialog.component.css',
})
export class VideogameFormDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;

  private readonly dialog = inject(MatDialogRef<VideogameFormDialogComponent>);
  private readonly service = inject(VideogameService);
  availablePlatforms: Platform[] = [
    new Platform(1, 'PlayStation 5', 'PS5'),
    new Platform(2, 'Xbox Series X', 'XSX'),
    new Platform(3, 'PC', 'PC'),
    new Platform(4, 'Nintendo Switch', 'Switch'),
  ];

  ngOnInit() {
    this.form = new FormGroup({
      titleVideogame: new FormControl(''),
      priceVideogame: new FormControl(),
      descVideogame: new FormControl(''),
      releaseDateVideogame: new FormControl<Date | null>(null),
      platforms: new FormControl([]),
    });
  }

  ngOnDestroy(): void {}

  save() {
    if (this.form.valid) {
      this.service.createVideogame(this.form.value).subscribe(() => {
        this.dialog.close();
      });
    }
  }

  reset() {
    this.form.reset();
  }
}
