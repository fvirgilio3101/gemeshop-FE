import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VideogameService } from '../videogame/videogame.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-videogame-form-dialog',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule],
  providers:[VideogameService],
  templateUrl: './videogame-form-dialog.component.html',
  styleUrl: './videogame-form-dialog.component.css'
})
export class VideogameFormDialogComponent implements OnInit,OnDestroy {

  form: FormGroup;

  private unsubscriber = new Subscription();

  constructor(
    private dialog: MatDialogRef<VideogameFormDialogComponent>,
    private service: VideogameService
  ){}

  ngOnDestroy(): void {
    this.unsubscriber.unsubscribe();
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
    const sub = this.service.createVideogame(this.form.value).subscribe(
      {next:event => this.dialog.close(event)}
    );
    this.unsubscriber.add(sub);
  }

  reset(){
    this.form.reset;
  }

}
