import { Component } from '@angular/core';
import { ScrollSnapAutoplay, ScrollSnapLoop, ScrollSnapSlider } from 'scroll-snap-slider'

@Component({
  selector: 'app-items-carousel',
  templateUrl: './items-carousel.component.html',
  styleUrls: ['./items-carousel.component.scss']
})
export class ItemsCarouselComponent {

  slideConfig = {
    infinite: true,
    // autoplay: true,
    slidesToShow : 3,
    slidesToScroll : 1,
    arrows : true,
    dots : true,
  }

  images = [
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(13).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(3).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
    {img : "https://mdbootstrap.com/img/Photos/Slides/img%20(9).webp"},
  ]

  constructor() {}

  ngOnInit() {
  }

}
