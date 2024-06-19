import { Component } from '@angular/core';
import { RecursosService } from '../../servicio/recursos.service';
import { HttpClientModule } from '@angular/common/http';
import { Serie } from '../../interfaz/serie';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Asegúrate de importar 

@Component({
  selector: 'app-lista-series',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [RecursosService],
  templateUrl: './lista-series.component.html',
  styleUrls: ['./lista-series.component.css'] // Debe ser styleUrls en plural
})
export class ListaSeriesComponent {
  series: Serie[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  pageSize: number = 4; // Number of pages to show at once

  constructor(private recursosService: RecursosService) {
    recursosService.obtenerDatos().subscribe(respuesta => {
      this.series = respuesta as Array<Serie>;
      console.log(this.series);
      this.calculateTotalPages();
    });
  }

  getImageUrl(serie: Serie): string {
    return serie.image.original;
  }

  getAverage(serie: Serie): number {
    return serie.rating.average / 2;
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating / 2 >= i) {
        stars.push('fas fa-star');
      } else if (rating / 2 >= i - 0.5) {
        stars.push('fas fa-star-half-alt');
      } else {
        stars.push('far fa-star');
      }
    }
    return stars;
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.series.length / this.itemsPerPage);
  }

  getPaginatedSeries(): Serie[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.series.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
  }

  trackBySerieId(index: number, serie: Serie): number {
    return serie.id;
  }

  getName(serie: Serie): string {
    if (serie.name.length >= 20) {
      return serie.name.slice(0, 23 - 3) + '...';
    }
    return serie.name;
  }

  get pages(): number[] {
    const pagesToShow = this.pageSize;
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, this.currentPage - halfPagesToShow);
    let endPage = Math.min(this.totalPages, this.currentPage + halfPagesToShow);

    if (this.currentPage <= halfPagesToShow) {
      endPage = pagesToShow;
    }
    if (this.currentPage + halfPagesToShow >= this.totalPages) {
      startPage = this.totalPages - pagesToShow + 1;
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }
}
