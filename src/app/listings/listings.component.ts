import { Component } from '@angular/core';
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

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.getListings();
  }

  getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }
}