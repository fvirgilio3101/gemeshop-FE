import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Videogame } from '../model/videogame';

@Injectable({
  providedIn: 'root',
})
export class VideogameService {
  baseUrl = 'http://localhost:8082/it.ecubit.gameshop/api/videogame';

  constructor(private http: HttpClient) {}

  readAllVideogame(): Observable<Videogame[]> {
    return this.http.get<Videogame[]>(this.baseUrl, { withCredentials: true });
  }

  createVideogame(videogame: Videogame): Observable<Videogame> {
    return this.http.post<Videogame>(this.baseUrl, videogame, {
      withCredentials: true,
    });
  }

  updateVideogame(videogame: Videogame): Observable<Videogame> {
    return this.http.put<Videogame>(this.baseUrl, videogame, {
      withCredentials: true,
    });
  }

  deleteVideogame(videogame: Videogame): void {
    this.http.delete<void>(this.baseUrl, { withCredentials: true }).subscribe();
  }

  setGenres(id: number, genres: string[]): Observable<Videogame> {
    return this.http.put<Videogame>(`${this.baseUrl}/${id}/genres`, genres, {
      withCredentials: true,
    });
  }
}
