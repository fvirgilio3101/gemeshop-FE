import { CommonModule } from '@angular/common';
import { Component, inject,DestroyRef,OnInit} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs';
import { Videogame } from '../model/videogame';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { VideogameFormDialogComponent } from '../videogame-form-dialog/videogame-form-dialog.component';
import { VideogameEventService } from './videogame-event.service';
import { RatingService } from './rating.service';
import { VideogameSearchService } from './videogame-search.service';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-videogame',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './videogame.component.html',
  styleUrl: './videogame.component.css'
})
export class VideogameComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  private readonly gameService = inject(VideogameEventService);
  private readonly dialog = inject(MatDialog);
  private readonly searchService = inject(VideogameSearchService);
  private readonly ratingService = inject(RatingService)


  hoveredRating: { [id: number]: number } = {};
  userID = 1;

  filterForm: FormGroup  = new FormGroup({
    title: new FormControl(''),
    maxPrice: new FormControl(null),
    averageRating: new FormControl(null),
    releaseDate:new FormControl(null)
  });

  videogames$: Observable<Videogame[]>; // Lista dei videogiochi



  ngOnInit(){
    this.videogames$ = this.gameService.readAllVideogame();
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.videogames$=this.searchService.readFilteredVideogames(filters)
  }

  // Funzione per resettare i filtri
  resetFilters() {
    this.filterForm.reset();
    this.videogames$ = this.gameService.readAllVideogame();  // Ricarica tutti i videogiochi
  }

  open() {
    return this.dialog.open(VideogameFormDialogComponent, { width: '60vw', height: 'auto' })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  rateGame(videogameId: number, value: number) {
    this.ratingService.rateGame(videogameId, this.userID, value).pipe(
      takeUntilDestroyed(this.destroyRef))
    .subscribe(
      {next: () => this.videogames$ = this.gameService.readAllVideogame()}
    );
  }


}
