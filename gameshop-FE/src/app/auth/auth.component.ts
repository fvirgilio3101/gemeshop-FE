import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

 private http = inject(HttpClient);
  onSubmit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    const body = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
  
    this.http
      .post('http://localhost:8082/it.ecubit.gameshop/login', body, {
        headers,
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          console.log('Login response', response);
          localStorage.setItem('isLoggedIn', 'true'); // salva stato login
          this.errorMessage = '';
          window.location.href = '/videogames';
        },
        error: () => {
          this.errorMessage = 'Credenziali non valide. Riprova';
        },
      });
  }
}
