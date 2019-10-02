import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 

  slidesOpts = {
    slidesPerView: 1.1,
    freeMode: true
  }

peliculasRecientes: Pelicula[]=[];
populares: Pelicula[]=[];

  constructor(private movieSRV: MoviesService) {}

  ngOnInit(): void {
   this.movieSRV.getCartelera().subscribe( resp => {
    this.peliculasRecientes= resp.results;
   });

   this.getPopulares();
  }

  cargarMas()
  {
    this.getPopulares();
  }

  getPopulares(){

   this.movieSRV.getPopulares().subscribe(resp => {

    /* esto es un fix por que el arreglo que le mando a la pagina es filtrado por un pipe y se tara */
    const arreglo = [...this.populares, ...resp.results];
    this.populares= arreglo;
  });
  }
}
