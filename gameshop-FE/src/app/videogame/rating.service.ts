import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn:'root'
})
export class RatingService{

  private baseUrl = 'http://localhost:8082/it.ecubit.gameshop/api/rating'
  private http = inject(HttpClient);


  rateGame(videogameId: number, userId: number, value: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/${videogameId}/rate?userId=${userId}&value=${value}`,
    {},
    {withCredentials: true,});
}

}
