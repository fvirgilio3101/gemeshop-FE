import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { Videogame } from "../../model/videogame";
import { HttpClient, HttpParams } from "@angular/common/http";
import { VideogameDocument } from "../../model/videogame-document";

@Injectable({
  providedIn:'root'
})
export class VideogameSearchService{

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8082/it.ecubit.gameshop/api/index'

  private readonly videogame_ = signal<VideogameDocument[]>([]);

  getVideogame_(){
    return this.videogame_
  }

  readAllVideogame():Observable<VideogameDocument[]>{
    return this.http.get<VideogameDocument[]>(this.apiUrl +'/videogames')
  }

   refresh() {
    this.readAllVideogame().subscribe(data => this.videogame_.set(data));
  }

  readFilteredVideogames(filters: any): Observable<VideogameDocument[]> {
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
   if (filters.platforms && filters.platforms.length > 0) {
      params = params.set('platforms', filters.platforms.join(','));
    }

    if (filters.genres && filters.genres.length > 0) {
      params = params.set('genres', filters.genres.join(','));
    }

    return this.http.get<VideogameDocument[]>(`${this.apiUrl}/filter`, { params,withCredentials:true });
  }
}
