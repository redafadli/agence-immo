import { Component } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent {

  listings: Listing[] = [];
  selectedListing: Listing = {
  id: 0,
  name: '',
  price: 0,
  state: '',
  city: '',
  description: '',
  address: '',
  imageUrls: []
};

  constructor(private listingService: ListingService,
    private snackBar: MatSnackBar) { }

    onIdSelect(event: Event): void {
      let id = (event.target as HTMLInputElement).value;
      const selectedListing = this.listings.find(listing => listing.id === +id);
      
      if (selectedListing) {
        this.selectedListing = selectedListing;
      } else {
        // Handle the case when no matching listing is found
        // For example, you can display an error message.
        console.error('No matching listing found.');
      }
    }    

  ngOnInit(): void {
    this.getListings();
  }

  private getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }

  editListing(): void {
    if (this.selectedListing) {
      this.listingService.updateListing(this.selectedListing)
        .subscribe(
          () => {
            console.log('Listing updated successfully');
            this.snackBar.open('Listing updated successfully', 'close', { duration: 500 })
          },
          error => {
            console.error('Error updating listing:', error);
            // You can handle errors here, e.g., show an error message to the user.
          }
        );
    }
  }  
}
