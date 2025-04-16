import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VideogameService } from './videogame.service';
import { Observable } from 'rxjs';
import { Videogame } from '../model/videogame';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VideogameFormDialogComponent } from '../videogame-form-dialog/videogame-form-dialog.component';
import { VideogameEventService } from './videogame-event.service';
import { Subscription } from 'rxjs';
import { RatingService } from './rating.service';

@Component({
  selector: 'app-videogame',
  imports: [ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButton
  ],
  providers:[VideogameEventService,RatingService],
  templateUrl: './videogame.component.html',
  styleUrl: './videogame.component.css'
})
export class VideogameComponent implements OnInit,OnDestroy {

  hoveredRating: number = 0;
  userID = 1;
  videogames$: Observable<Videogame[]>;

  private unsubscriber = new Subscription();

  constructor(private service:VideogameEventService,private dialog: MatDialog,private ratingService: RatingService){}

  ngOnDestroy(): void {
    this.service.disposeAll();
    this.unsubscriber.unsubscribe();
  }

  ngOnInit(): void {
    this.videogames$ = this.service.readAllVideogame();
  }

  open(){
    const sub =this.dialog.open(VideogameFormDialogComponent,{width:'60vw',height:'auto'}).afterClosed()
    .subscribe(() => {
      // richiamo il service dopo la chiusura
      this.videogames$ = this.service.readAllVideogame();
    });
    this.unsubscriber.add(sub);
  }

  rateGame(videogameId: number, value: number) {
    const sub = this.ratingService.rateGame(videogameId, this.userID, value).subscribe({
      next: () => {
        // ricarica l’elenco per aggiornare i rating
        this.videogames$ = this.service.readAllVideogame();
      }
    });
    this.unsubscriber.add(sub);

  }



}
