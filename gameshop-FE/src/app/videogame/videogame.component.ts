import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  providers:[VideogameService],
  templateUrl: './videogame.component.html',
  styleUrl: './videogame.component.css'
})
export class VideogameComponent {

  videogames$: Observable<Videogame[]>;

  constructor(private service:VideogameService,private dialog: MatDialog){}

  ngOnInit(): void {
    this.videogames$ = this.service.readAllVideogame();
  }

  open(){
    this.dialog.open(VideogameFormDialogComponent,{width:'60vw',height:'auto'});
  }



}
