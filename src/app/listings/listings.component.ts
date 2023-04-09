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

  public listings: Listing[] = [];
  public colsNumber = 0;

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.checkWindowSize();
    this.getListings();
  }

  getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  public checkWindowSize(){
    if (window.innerWidth < 600){
      this.colsNumber = 1;
    } else if (window.innerWidth < 1024) {
      this.colsNumber = 2;
    } else {
      this.colsNumber = 3;
    }
  }
}