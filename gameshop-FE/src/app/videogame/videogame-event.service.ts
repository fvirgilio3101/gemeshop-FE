import { Injectable } from "@angular/core";
import { VideogameService } from "./videogame.service";
import { merge, mergeMap, Observable, Subject, Subscription } from "rxjs";
import { Videogame } from "../model/videogame";

@Injectable({
  providedIn:'root'
})
export class VideogameEventService{

  private realoadSource = new Subject<Videogame>();
  reloadSubject$ = this.realoadSource.asObservable();
  private unsubscriber = new Subscription();


  constructor(private service:VideogameService){}

  disposeAll() {
    this.unsubscriber.unsubscribe();
  }

  readAllVideogame():Observable<Videogame[]>{
    const onShot = this.service.readAllVideogame();
    const onChange = this.reloadSubject$.pipe(
      mergeMap(()=>this.service.readAllVideogame())
    );
    return merge(onShot,onChange);
  }

  saveVideogame(videogame:Videogame){
    const sub = this.service.createVideogame(videogame).subscribe(
      p => this.realoadSource.next(p)
    )
    this.unsubscriber.add(sub);
  }

}
