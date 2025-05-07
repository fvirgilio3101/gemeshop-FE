import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, effect, DestroyRef} from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import {tap, Observable,Subscription} from 'rxjs';
import { Videogame } from '../model/videogame';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { VideogameFormDialogComponent } from '../videogame-form-dialog/videogame-form-dialog.component';
import { VideogameEventService } from './videogame-event.service';
import { RatingService } from './rating.service';

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
    MatButton
  ],
  templateUrl: './videogame.component.html',
  styleUrl: './videogame.component.css'
})
export class VideogameComponent {

  private readonly destroyRef = inject(DestroyRef);
  private readonly gameService = inject(VideogameEventService);
  private readonly ratingService = inject(RatingService);
  private readonly dialog = inject(MatDialog);

  hoveredRating: { [id: number]: number } = {};
  userID = 1;
  videogames$ = this.gameService.readAllVideogame();


  open(){
    return this.dialog.open(VideogameFormDialogComponent,{width:'60vw',height:'auto'})
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
  }

  rateGame(videogameId: number, value: number) {
    this.ratingService.rateGame(videogameId, this.userID, value).pipe(
      takeUntilDestroyed(this.destroyRef))
    .subscribe(
      {next: () => this.videogames$ = this.gameService.readAllVideogame()}
    );
  }



}
