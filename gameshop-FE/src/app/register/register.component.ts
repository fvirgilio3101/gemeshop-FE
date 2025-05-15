import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule,
     MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class RegisterComponent {
  name = '';
  surname = '';
  email = '';
  username = '';
  password = '';
  address = '';
  phone_number = '';
  errorMessage = '';

  private readonly router = inject(Router);
  private readonly service = inject(AuthService);

  onSubmit() {
    const user = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      username: this.username,
      password: this.password,
      address: this.address,
      phone_number: this.phone_number,
    };

    this.service.register(user)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Errore durante la registrazione. Riprova.';
          console.error('Errore nella registrazione', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          console.log('Registrazione avvenuta con successo', response);
          this.router.navigate(['/login']);
        }
      });
  }
}
