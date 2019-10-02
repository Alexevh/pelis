import { Injectable } from '@angular/core';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  peliculas: PeliculaDetalle[]=[]
  constructor(private storage: Storage, private toastCTRL: ToastController) { 
    this.cargarFavoritos();
  }


  guardarFavorito(pelicula: PeliculaDetalle)
  {

    let existe = false;
    
    for (const peli of this.peliculas)
    {
      if (peli.id===pelicula.id)
      {
        existe=true;
        break;
      }
    }

    /* si existe la borro */
    if (existe)
    {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      this.storage.set('peliculas', this.peliculas);
      this.presentarToast('La pelicula se elimino de favoritos');

    } else {
      this.peliculas.push(pelicula);
      this.presentarToast('La pelicula se agrego a favoritos');
     
    }

    this.storage.set('peliculas', this.peliculas);
    
  }

  async presentarToast(mensaje)
  {
    const toast = await this.toastCTRL.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
    });

    toast.present();

  }


  async cargarFavoritos()
  {
      const peliculas   = await  this.storage.get('peliculas');
      /* en este momento TS no sabe el tipado de este objeto, como el elmento me puede venir vacio en lufar de meter un null
      hago el OR con un vacio*/
      this.peliculas = peliculas || [];
      return this.peliculas;
  }

  async existePelicula(id)
  {
    /* me viene un string pero necesito convertirlo a entero por asi lo guarde en la BD */
    id= Number(id);

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id===id);

    return (existe)? true : false;
  }
}
