import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecursosService } from '../../servicio/recursos.service';
import { Serie } from '../../interfaz/serie';

@Component({
  selector: 'app-generos',
  standalone: true,
  imports: [ HttpClientModule,CommonModule],
  providers: [RecursosService],
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {
  generos: string[] = [];
  seriesPorGenero: Serie[] = [];
  selectedGenre: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Serie[]>('https://api.tvmaze.com/shows').subscribe(data => {
      const genresSet = new Set<string>();
      data.forEach(show => {
        if (show.genres && show.genres.length > 0) {
          show.genres.forEach((genre: string) => genresSet.add(genre));
        }
      });
      this.generos = Array.from(genresSet);
    });
  }

  seleccionarGenero(genero: string): void {
    this.selectedGenre = genero;
    this.http.get<Serie[]>('https://api.tvmaze.com/shows').subscribe(data => {
      this.seriesPorGenero = data.filter(show => show.genres && show.genres.includes(genero));
    });
  }

  getImageUrl(serie: Serie): string {
    return serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295';
  }

  getName(serie: Serie): string {
    return serie.name;
  }

  getAverage(serie: Serie): number {
    return serie.rating.average ? serie.rating.average : 0;
  }

  getStars(average: number): string[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.round(average / 2)) {
        stars.push('fa fa-star');
      } else {
        stars.push('fa fa-star-o');
      }
    }
    return stars;
  }

  trackBySerieId(index: number, serie: Serie): number {
    return serie.id;
  }
  
}
