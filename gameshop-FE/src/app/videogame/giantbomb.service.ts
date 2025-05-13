import { HttpClient } from "@angular/common/http"
import { Injectable, inject, signal } from "@angular/core"
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class GiantBombService{
  private readonly baseUrl = 'https://www.giantbomb.com/api/games/'

  private readonly http = inject(HttpClient);

  videogameSignal = signal<any>([]);

  getGames():Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }


}
