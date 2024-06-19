import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Show } from '../interfaz/serie';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private apiUrl = 'https://api.tvmaze.com/shows';


  constructor(private http: HttpClient) { }

  obtenerDatos(){
    return this.http.get('https://api.tvmaze.com/shows')
  }

  getShowsByGenre(genres: string[]): Observable<{ [genre: string]: Show[] }> {
    // Crear un arreglo de observables para cada género
    const observables: Observable<Show[]>[] = genres.map(genre => {
      const url = `${this.apiUrl}/shows?q=genre:${genre}`;
      return this.http.get<Show[]>(url);
    });

    // Usar forkJoin para combinar todas las solicitudes HTTP
    return forkJoin(observables).pipe(
      map((responses: Show[][]) => {
        const showsByGenre: { [genre: string]: Show[] } = {};

        genres.forEach((genre, index) => {
          showsByGenre[genre] = responses[index];
        });

        return showsByGenre;
      })
    );
  }

}
