import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  username = '';
  password = '';
  errorMessage = '';

  private readonly service = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  onSubmit() {
    this.service.login(this.username, this.password).subscribe({
      next: (response) => {
        sessionStorage.setItem('isLoggedIn', 'true');
        this.errorMessage = '';
        window.location.href = '/videogames';
      },
      error: () => {
        this.errorMessage = 'Credenziali non valide. Riprova';
      },
    });
  }
}
