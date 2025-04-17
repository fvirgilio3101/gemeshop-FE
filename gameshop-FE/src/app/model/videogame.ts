import { Genres } from "./genres";

export class Videogame{
  idVideogame : number;
  titleVideogame : string;
  genres : Genres[];
  priceVideogame : number;
  descVideogame : string;
  rating : number;

  constructor(idVideogame:number,titleVideogame: string,genres:Genres[],priceVideogame:number,descVideogame:string,rating:number){
    this.idVideogame = idVideogame;
    this.titleVideogame = titleVideogame;
    this.genres = genres;
    this.priceVideogame = priceVideogame;
    this.descVideogame = descVideogame;
    this.rating = rating;
  }


}
