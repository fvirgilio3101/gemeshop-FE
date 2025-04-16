import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VideogameService } from '../videogame/videogame.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { VideogameEventService } from '../videogame/videogame-event.service';

@Component({
  selector: 'app-videogame-form-dialog',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule],
  providers:[VideogameEventService],
  templateUrl: './videogame-form-dialog.component.html',
  styleUrl: './videogame-form-dialog.component.css'
})
export class VideogameFormDialogComponent implements OnInit,OnDestroy {

  form: FormGroup;

  private unsubscriber = new Subscription();

  constructor(
    private dialog: MatDialogRef<VideogameFormDialogComponent>,
    private service: VideogameEventService
  ){}

  ngOnDestroy(): void {
    this.service.disposeAll();
  }

  ngOnInit(){
    this.initForm();
  }

  private initForm(){
    this.form = new FormGroup({
      titleVideogame: new FormControl(''),
      genres: new FormControl(),
      priceVideogame: new FormControl(),
      descVideogame: new FormControl(''),
      rating: new FormControl(),
    });
  }

  save(){
    if(this.form.valid){
      this.service.saveVideogame(this.form.value);
      this.dialog.close();
    }

  }

  reset(){
    this.form.reset;
  }

}
