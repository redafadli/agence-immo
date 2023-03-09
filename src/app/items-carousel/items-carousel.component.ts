import { Component } from '@angular/core';

@Component({
  selector: 'app-items-carousel',
  templateUrl: './items-carousel.component.html',
  styleUrls: ['./items-carousel.component.scss']
})
export class ItemsCarouselComponent {

  onButtonClick(item: any) {
    console.log(item);
  }

  items = [
    {
      name: 'Item 1',
      description: 'Description of Item 1',
      image: 'https://via.placeholder.com/800x400?text=Item%201'
    },
    {
      name: 'Item 2',
      description: 'Description of Item 2',
      image: 'https://via.placeholder.com/800x400?text=Item%202'
    }
  ]

}
