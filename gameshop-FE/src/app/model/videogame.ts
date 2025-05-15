import { Genres } from "./genres";
import { Platform } from "./platform";

export class Videogame{
  idVideogame : number;
  titleVideogame : string;
  genres : Genres[];
  priceVideogame : number;
  descVideogame : string;
  rating : number;
  releaseDateVideogame : Date;
  platforms : Platform[];

  constructor(idVideogame:number,titleVideogame: string,genres:Genres[],priceVideogame:number,descVideogame:string,rating:number, releaseDate:Date, platforms : Platform[]){
    this.idVideogame = idVideogame;
    this.titleVideogame = titleVideogame;
    this.genres = genres;
    this.priceVideogame = priceVideogame;
    this.descVideogame = descVideogame;
    this.rating = rating;
    this.releaseDateVideogame = releaseDate;
    this.platforms = platforms;
  }


}
