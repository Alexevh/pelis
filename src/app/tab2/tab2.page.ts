import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string;
  ideas =['Spiderman', 'Avengers', 'Scream', 'La vida es bella'];
  peliculas: Pelicula[] =[];
  buscando=false;


  constructor(private movieCRTL: MoviesService, private modalCTRL: ModalController) {}


  buscar(event)

  {
    
    this.buscando = true;
    const valor = event.detail.value;
    if (valor==='')
    {
      this.buscando=false;
      return;
    }

    this.movieCRTL.buscarPeliculas(valor).subscribe( resp =>
      {
        /* la llamada de la api me retorna un JSON que tiene results: vector, para ponerlo puedo o bien crear la interfaz o bien poner 
        el vector como atributo */
        this.peliculas = resp['results'];
        this.buscando=false;
      }
    )
  }

  async verDetalle(id: string)
  {
    const modal = await this.modalCTRL.create({
      component: DetalleComponent,
      componentProps: {id}
    });

    modal.present();
  }

}
