import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../interfaz/serie';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http: HttpClient) { }
  topSeries: Serie[] = [];

  obtenerDatos(){
    return this.http.get('https://api.tvmaze.com/shows')
  }

  obtenerTop(): void {
    this.http.get<Serie[]>('https://api.tvmaze.com/shows')
      .subscribe(data => {
        // Ordenar por rating de mayor a menor y tomar solo las primeras 10
        this.topSeries = data.sort((a, b) => b.rating.average - a.rating.average).slice(0, 10);

        // Obtener las imágenes para cada serie
        this.topSeries.forEach(serie => {
          this.http.get<any>(`https://api.tvmaze.com/shows/${serie.id}/images`)
            .subscribe(images => {
              if (images && images.length > 0) {
                // Asignar la URL de la imagen medium si está disponible
                serie.image = images[0].resolutions.medium;
              }
            });
        });
      });
  }
}
