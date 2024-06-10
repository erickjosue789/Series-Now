import { Component } from '@angular/core';
import { RecursosService } from '../../servicio/recursos.service';
import { HttpClientModule } from '@angular/common/http';
import { Serie } from '../../interfaz/serie';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Asegúrate de importar 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HttpClientModule,CommonModule],
  providers: [RecursosService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  series:Serie[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  pages: number[] = [];


  constructor(private recursosService: RecursosService){
    recursosService.obtenerDatos().subscribe(respuesta =>{
      this.series = respuesta as Array<Serie>;
      console.log(this.series);
      this.calculatePages();
    })
  }

  getImageUrl(serie: Serie): string {
    return serie.image.original;
  }

  getAverage(serie: Serie): number {
    const x = serie.rating.average / 2;
    return x;
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating/2 >= i) {
        stars.push('fas fa-star');
      } else if (rating/2 >= i - 0.5) {
        stars.push('fas fa-star-half-alt');
      } else {
        stars.push('far fa-star');
      }
    }
    return stars;
  }


  calculatePages(): void {
    const totalPages = Math.ceil(this.series.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  getPaginatedSeries(): Serie[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.series.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pages.length) {
      this.currentPage = page;
    }
  }

  trackBySerieId(index: number, serie: Serie): number {
    return serie.id;
  }

  getName(serie: Serie): string{
    if (serie.name.length >= 20) {
      return serie.name.slice(0, 23 - 3) + '...';
    }
    return serie.name;
  }

}
