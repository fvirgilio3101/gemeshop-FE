import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { catchError, of } from 'rxjs';
import { User } from '../model/user';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  CommonModule,
  MatDividerModule,
  MatProgressSpinner,
  MatToolbarModule,
  RouterModule
],

})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  showPassword = false;
  errorMessage = '';

  private readonly service = inject(AuthService);

  ngOnInit(): void {
    this.service.getUserDetails()
      .pipe(
        catchError((err) => {
          this.errorMessage = 'Errore durante il recupero dei dati utente';
          console.error(err);
          return of(null);
        })
      )
      .subscribe((data: User | null) => {
        if (data) this.user = data;
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
