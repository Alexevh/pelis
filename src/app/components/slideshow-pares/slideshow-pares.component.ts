import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] =[];

  /** esto le manda un evento al padre */
  @Output() cargarMas = new EventEmitter();
  
  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  }
  constructor(private modalCTRL: ModalController) { }

  ngOnInit() {}



  onClick(){
    this.cargarMas.emit();
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
