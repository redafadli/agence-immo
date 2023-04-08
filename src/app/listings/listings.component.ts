import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent {

  public listings: Listing[] = [
    { id: 1, title:"First", price:10, city:'Mons', image:"https://mdbootstrap.com/img/Photos/Slides/img%20(15).webp" },
    { id: 1, title:"Second", price:10, city:'Mons', image:"https://mdbootstrap.com/img/Photos/Slides/img%20(13).webp" },
    { id: 1, title:"Third", price:10, city:'Mons', image:"https://mdbootstrap.com/img/Photos/Slides/img%20(23).webp" },
    { id: 1, title:"Fourth", price:10, city:'Mons', image:"https://mdbootstrap.com/img/Photos/Slides/img%20(17).webp" },
  ];
  public colsNumber = 0;
  public innerWidth: any;

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    // this.getListings();
  }

  getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.innerWidth = window.innerWidth;
  //   if (this.innerWidth < 600){
  //     this.colsNumber = 1;
  //   } else if (this.innerWidth < 1024) {
  //     this.colsNumber = 2;
  //   } else {
  //     this.colsNumber = 3;
  //   }
  // }
}