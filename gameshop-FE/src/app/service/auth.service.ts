import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AuthService{

  private readonly http = inject(HttpClient);

  login(username:string,password:string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    return this.http
      .post('http://localhost:8082/it.ecubit.gameshop/login', body, {
        headers,
        withCredentials: true,
        responseType: 'text',
      })
  }

  register(user:any){
    return this.http
      .post(
        'http://localhost:8082/it.ecubit.gameshop/api/user/register',
        user,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          withCredentials: true,
        }
      )
  }
}
