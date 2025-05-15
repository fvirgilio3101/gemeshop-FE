import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Videogame } from "../../model/videogame";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class VideogameSearchService{

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8082/it.ecubit.gameshop/api/index'
  readFilteredVideogames(filters: any): Observable<Videogame[]> {
    let params = new HttpParams();

    if (filters.title) {
      params = params.set('titleVideogame', filters.title);
    }
    if (filters.maxPrice) {
      params = params.set('priceVideogame', filters.maxPrice.toString());
    }
    if (filters.releaseDate) {
      const releaseDate = new Date(filters.releaseDate);
      const timestamp = releaseDate.getTime();
      params = params.set('releaseDateVideogame', timestamp.toString());
    }
    if (filters.platforms) {
      params = params.set('platforms', filters.platforms);
    }

    return this.http.get<Videogame[]>(`${this.apiUrl}/filter`, { params,withCredentials:true });
  }
}
