export class Videogame{
  id : number;
  titleVideogame : string;
  genres : string[];
  priceVideogame : number;
  descVideogame : string;
  rating : number;

  constructor(id:number,titleVideogame: string,genres:string[],priceVideogame:number,descVideogame:string,rating:number){
    this.id = id;
    this.titleVideogame = titleVideogame;
    this.genres = genres;
    this.priceVideogame = priceVideogame;
    this.descVideogame = descVideogame;
    this.rating = rating;
  }


}
