import { Component, OnInit } from '@angular/core';
import { RecursosService } from '../../servicio/recursos.service';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { Serie } from '../../interfaz/serie';
import { CommonModule } from '@angular/common'; // Asegúrate de importar 

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [ HttpClientModule, CommonModule],
  providers: [RecursosService],
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  topSeries: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerTop();
  }

  obtenerTop(): void {
    this.http.get<any[]>('https://api.tvmaze.com/shows')
      .subscribe(data => {
        // Ordenar por rating de mayor a menor y tomar solo las primeras 10
        this.topSeries = data.sort((a, b) => b.rating.average - a.rating.average).slice(0, 10);
        // Add seasons and genres
        this.topSeries.forEach(serie => {
          serie.seasons = 7; // Mocked data, replace with actual seasons if available
          serie.genres = serie.genres || ['Drama']; // Mocked data, replace with actual genres if available
        });
      });
  }
}
