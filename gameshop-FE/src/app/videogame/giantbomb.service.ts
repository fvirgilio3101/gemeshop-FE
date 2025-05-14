// giant-bomb.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiantBombService {
  private baseUrl =
    'http://localhost:8082/it.ecubit.gameshop/api/giantbomb/games'; // URL del backend
  videogameSignal = signal<any>([]); // Signal per memorizzare i giochi

  constructor(private http: HttpClient) {}

  

  getGames(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  fetchGames(): void {
    this.getGames().subscribe(
      (data) => {
        this.videogameSignal.set(data.results);
        console.log(this.videogameSignal);
      },
      (error) => {
        console.error('Errore nel recuperare i giochi:', error);
      }
    );
  }
}
