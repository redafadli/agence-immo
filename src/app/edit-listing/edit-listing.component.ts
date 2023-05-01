import { Component } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent {

  listings: Listing[] = [];
  selectedListing?: Listing;

  constructor(private listingService: ListingService) { }

  onIdSelect(event: Event): void {
    let id = (event.target as HTMLInputElement).value;
    this.selectedListing = this.listings.find(listing => listing.id === +id);
  }

  ngOnInit(): void {
    this.getListings();
  }
  
  private getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }
}
