import { Component } from '@angular/core';
import { ScrollSnapAutoplay, ScrollSnapLoop, ScrollSnapSlider } from 'scroll-snap-slider'
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';

@Component({
  selector: 'app-items-carousel',
  templateUrl: './items-carousel.component.html',
  styleUrls: ['./items-carousel.component.scss']
})
export class ItemsCarouselComponent {

  listings : Listing[] = [];

  slideConfig = {
    slidesToShow : 3,
    slidesToScroll : 1,
    arrows : true,
  }

  constructor(private listingService: ListingService) {}

  ngOnInit() {
    this.getListings();
  }

  public getListings() : void {
    this.listingService.getListings().subscribe((listings) => {
      this.listings = listings;
    });
  }
}
