import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { VideogameService } from '../service/videogame/videogame.service';
import { Platform } from '../model/platform';
import { MatSelectModule } from '@angular/material/select';
import { GenreService } from '../service/genre.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { concatMap, mergeMap } from 'rxjs';
import { VideogameSearchService } from '../service/videogame/videogame-search.service';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
    FormsModule
  ],
  templateUrl: './videogame-form-dialog.component.html',
  styleUrl: './videogame-form-dialog.component.css',
})
export class VideogameFormDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  newScreenshot:string = '';

  private readonly dialog = inject(MatDialogRef<VideogameFormDialogComponent>);
  private readonly service = inject(VideogameService);
  private readonly genreService = inject(GenreService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchService = inject(VideogameSearchService);

  selectGenres = this.genreService.getGenre_();
  availablePlatforms: Platform[] = [
    new Platform(1, 'PlayStation 5', 'PS5'),
    new Platform(2, 'Xbox Series X', 'XSX'),
    new Platform(3, 'PC', 'PC'),
    new Platform(4, 'Nintendo Switch', 'Switch'),
  ];

  ngOnInit() {
    this.form = new FormGroup({
      titleVideogame: new FormControl(''),
      genres: new FormControl([]),
      priceVideogame: new FormControl(),
      descVideogame: new FormControl(''),
      releaseDateVideogame: new FormControl<Date | null>(null),
      platforms: new FormControl([]),
      coverImage: new FormControl(''),
      screenshots: new FormArray([])
    });
  }

  get screenshots(): FormArray {
  return this.form.get('screenshots') as FormArray;
}

addScreenshot() {
  const trimmed = this.newScreenshot.trim();
  if (trimmed) {
    this.screenshots.push(new FormControl(trimmed));
    this.newScreenshot = '';
  }
}

removeScreenshot(index: number) {
  this.screenshots.removeAt(index);
}

  ngOnDestroy(): void {
    this.genreService.readAllGenres()
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(genres => this.genreService.getGenre_().set(genres))
  }

  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.service.createVideogame(formValue).pipe(
       takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.searchService.refresh();
        this.dialog.close();
      });
    }
  }

  reset() {
    this.form.reset();
  }
}
