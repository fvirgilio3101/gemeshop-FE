import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Genres } from "../model/genres";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class GenreService{

  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8082/it.ecubit.gameshop/api/genre'

  private readonly genre_ = signal<Genres[]>([]);

  getGenre_(){
    return this.genre_
  }

  readAllGenres():Observable<Genres[]>{
    return this.http.get<Genres[]>(this.baseUrl,{withCredentials:true});
  }


}
