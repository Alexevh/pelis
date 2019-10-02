import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../services/datalocal.service';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  peliculas: PeliculaDetalle[]=[];
  generos: Genre[]=[];
  favoritoGenero: any[] = [];

  constructor(private data: DatalocalService, private movieSRV: MoviesService) {}


  async ngOnInit() {
   
  }


  /* esto es para que cargue no solo cuando inicia sino cuando ingresa, o sea es un view scoped de java por ejemplo en vez de un sessinscope */
   async ionViewWillEnter()
   {
    this.peliculas = await this.data.cargarFavoritos();
    this.generos = await this.movieSRV.cargarGeneros();
    this.pelisPorGenero( this.generos, this.peliculas );
   }

   pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]  ) {


    this.favoritoGenero = [];

    generos.forEach( genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id );
        })
      });

    });

    console.log(this.favoritoGenero);


  }

}
