import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit(){
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;
    this.http.post ('/login',body,{headers, withCredentials: true}).subscribe({
      next: () => {
        this.errorMessage = '';
        window.location.href = '/';
      },
      error: () => {
        this.errorMessage = 'Credenziali non valide. Riprova';
      }
    });

  }

}
