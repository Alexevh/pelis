import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] =[];
  
  slidesOpts = {
    slidesPerView: 1.1,
    freeMode: true
  }


  constructor(private modalCTRL: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string)
  {
    console.log('estoy en el slide y paso el idpeli', id);
    const modal = await this.modalCTRL.create({
      component: DetalleComponent,
      componentProps: {
        id,
      }
    });

    modal.present();
  }

}
