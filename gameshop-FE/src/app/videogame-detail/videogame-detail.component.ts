import { Component, inject, signal} from '@angular/core';
import { VideogameService } from '../service/videogame/videogame.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Videogame } from '../model/videogame';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-videogame-detail',
  imports: [
    CommonModule,
    MatChipsModule,
    MatProgressSpinner,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './videogame-detail.component.html',
  styleUrl: './videogame-detail.component.css'
})
export class VideogameDetailComponent {

  private readonly service = inject(VideogameService);
  private readonly route = inject(ActivatedRoute);

  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  game_ = toSignal(this.service.readVideogame(this.id));

}
