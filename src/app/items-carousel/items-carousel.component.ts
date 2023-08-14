import { Component } from '@angular/core';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-items-carousel',
  templateUrl: './items-carousel.component.html',
  styleUrls: ['./items-carousel.component.scss']
})
export class ItemsCarouselComponent {

  listings: Listing[] = [];
  slidesToShow: number = 3; // Default value for larger screens

  constructor(private listingService: ListingService,
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.getListings();
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Large])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.slidesToShow = 1;
        } 
        if (result.breakpoints[Breakpoints.Small]) {
          this.slidesToShow = 2;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.slidesToShow = 3;
        }
        
        // Update slideConfig here to use the updated slidesToShow value
        this.slideConfig = {
          slidesToShow: this.slidesToShow,
          slidesToScroll: 1,
          arrows: true,
        };
      });
  }

  slideConfig = {
    slidesToShow: this.slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  public getListings(): void {
    this.listingService.getListings().subscribe((listings) => {
      this.listings = listings.slice(-10);
    });
  }
}
