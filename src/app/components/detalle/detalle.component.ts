import { Component, OnInit, Input } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"]
})
export class DetalleComponent implements OnInit {
  @Input() id: string;
  pelicula: PeliculaDetalle = {};
  actores: Cast[]=[];
  existe=false;

  oculto=150;


  slideOptPoster = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private movieSRV: MoviesService, private modalCTRL: ModalController, private data: DatalocalService ) {}

  async ngOnInit() {

    this.existe = await this.data.existePelicula(this.id);
    

    console.log("me llega al detallecomponent", this.id);
    this.movieSRV.getDetallePelicula(this.id).subscribe(resp => {
    this.pelicula = resp;
    });

    this.movieSRV.getActoresPelicula(this.id).subscribe(resp => {
      this.actores = resp.cast;
      });

  }


  regresar()
  {
    this.modalCTRL.dismiss();
  }

  async favorito (){

    
    this.data.guardarFavorito(this.pelicula);
    this.existe = await this.data.existePelicula(this.id);
   
  }
}
