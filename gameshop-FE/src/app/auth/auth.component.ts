import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  username = '';
  password = '';
  errorMessage = '';


 private readonly service = inject(AuthService);
  onSubmit() {

    this.service.login(this.username,this.password)
      .subscribe({
        next: (response) => {
          console.log('Login response', response);
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
