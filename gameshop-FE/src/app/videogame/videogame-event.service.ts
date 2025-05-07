import { DestroyRef, Injectable,inject } from "@angular/core";
import { VideogameService } from "./videogame.service";
import { merge, mergeMap, Observable, Subject, Subscription } from "rxjs";
import { Videogame } from "../model/videogame";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn:'root'
})
export class VideogameEventService{

  private readonly service = inject(VideogameService);
  private readonly destroyRef = inject(DestroyRef);

  private reloadSource = new Subject<Videogame>();
  reloadSubject$ = this.reloadSource.asObservable();


  readAllVideogame():Observable<Videogame[]>{
    const onShot = this.service.readAllVideogame();
    const onChange = this.reloadSubject$.pipe(
      mergeMap(()=>this.service.readAllVideogame())
    );
    return merge(onShot,onChange);
  }

  saveVideogame(videogame:Videogame){
    const sub = this.service.createVideogame(videogame)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe(
      p => this.reloadSource.next(p)
    );
  }

}
