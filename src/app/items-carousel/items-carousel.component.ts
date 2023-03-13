import { Component } from '@angular/core';

@Component({
  selector: 'app-items-carousel',
  templateUrl: './items-carousel.component.html',
  styleUrls: ['./items-carousel.component.scss']
})
export class ItemsCarouselComponent {

  carouselConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  slides = [
    { title: 'Slide 1', imageUrl: 'https://picsum.photos/250/200' },
    { title: 'Slide 2', imageUrl: 'https://picsum.photos/250/200' }
  ];
}
