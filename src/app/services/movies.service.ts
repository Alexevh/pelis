import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
const lenguaje = '&language=es&include_image_language=es';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  generos: any;
   popularesPage =0;

  constructor(private http: HttpClient) { }


  getCartelera()
  {

    const hoy = new Date();

    /* ultimo dia del mes */
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() +1, 0).getDate();
    /** le sumo 1 por que los meses empiezan en cero */
    const mes = hoy.getMonth()+1;

    let mesString;

    if (mes <10)
    {
      mesString = '0'+mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    const query = `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`;
    return  this.ejecutarQuery<RespuestaMDB>(query);
    //return this.http.get<RespuestaMDB>('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-10-22&api_key=512b518d35205e6b74e14dd449bc0457&language=es&include_image_language=es');
  }


  getPopulares()
  {

    this.popularesPage++;

    const query =`/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

   
    return this.ejecutarQuery<RespuestaMDB>(query);
  }


   getDetallePelicula(id: string)
  {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
    
  }

  getActoresPelicula(id: string)
  {
    
   
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  buscarPeliculas(texto: string){
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  cargarGeneros(): Promise<Genre[]> {

    return new Promise( resolve => {

      this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        });

    });


  }

  private ejecutarQuery<T>(query: string)
  {
    query = URL + query;
    query +=`&api_key=${apiKey}${lenguaje}`;
    return this.http.get<T>(query);
  }
}
