import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VideogameFormDialogComponent } from '../videogame-form-dialog/videogame-form-dialog.component';
import { RatingService } from '../service/rating.service';
import { VideogameSearchService } from '../service/videogame/videogame-search.service';
import { GenreService } from '../service/genre.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { VideogameService } from '../service/videogame/videogame.service';
import { Platform } from '../model/platform';

@Component({
  selector: 'app-videogame',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './videogame.component.html',
  styleUrl: './videogame.component.css',
})
export class VideogameComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly gameService = inject(VideogameService);
  private readonly dialog = inject(MatDialog);
  private readonly searchService = inject(VideogameSearchService);
  private readonly ratingService = inject(RatingService);
  private readonly genreService = inject(GenreService);

  hoveredRating: { [id: number]: number } = {};
  userID = 1;
  isLoggedIn: boolean = false;

  selectGenres = this.genreService.getGenre_();

  availablePlatforms: Platform[] = [
      new Platform(1, 'PlayStation 5', 'PS5'),
      new Platform(2, 'Xbox Series X', 'XSX'),
      new Platform(3, 'PC', 'PC'),
      new Platform(4, 'Nintendo Switch', 'Switch'),
    ];

  filterForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    maxPrice: new FormControl(null),
    averageRating: new FormControl(null),
    releaseDate: new FormControl(null),
    platforms: new FormControl([]),
    genres:new FormControl([]),
  });

  videogames_ = this.gameService.videogameSignal;

  ngOnInit() {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    this.isLoggedIn = loggedInStatus === 'true';
    this.gameService.readAllVideogame();
    this.genreService
      .readAllGenres()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((genres) => this.genreService.getGenre_().set(genres));
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.searchService
      .readFilteredVideogames(filters)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((filtered) => this.videogames_.set(filtered));

  }

  resetFilters() {
    this.filterForm.reset();
    this.gameService.readAllVideogame();
  }

  open() {
    return this.dialog
      .open(VideogameFormDialogComponent, {
        width: '60vw',
        height: 'auto',
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  rateGame(videogameId: number, value: number) {
    this.ratingService
      .rateGame(videogameId, this.userID, value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.gameService.readAllVideogame(),
      });
  }
  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userID');
    this.isLoggedIn = false;
    window.location.href = '/videogames';
  }
}
