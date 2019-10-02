import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgpath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {



  /* este pipe va a filtrar y devolver la url, lo podria poner a mano en el ion-image */
  transform(img: string, size: string ='w500' ): string {

    if (!img){
      return '.assets/no-image-banner.jpg';
    }

    const imgURL = `${URL}${size}${img}`;
    console.log('img', imgURL)
    return imgURL;
  }

}
