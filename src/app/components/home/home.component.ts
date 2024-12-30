import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Category, Products } from '../../core/interface/products';
import { ProductService } from '../../core/service/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [SlicePipe, CurrencyPipe, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private _ProductService: ProductService) {}

  products: Products[] = [];
  categories: Category[] = [];
  mainSlides = [
    { src: 'slider-1.jpg', alt: 'slider-1' },
    { src: 'slider-2.jpeg', alt: 'slider-2' },
    { src: 'slider-3.jpeg', alt: 'slider-3' },
  ];

  ngOnInit() {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (error) => {},
    });

    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {},
    });
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['Back', 'next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['Back', 'next'],
    items: 1,
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 2,
    //   },
    //   740: {
    //     items: 3,
    //   },
    //   940: {
    //     items: 5,
    //   },
    // },
    nav: false,
  };
}
