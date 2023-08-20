import { Component } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-listing',
  templateUrl: './delete-listing.component.html',
  styleUrls: ['./delete-listing.component.scss']
})
export class DeleteListingComponent {

  listings: Listing[] = [];
  selectedId: number | null = null;

  constructor(private listingService: ListingService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.getListings();
  }

  private getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }

  getSelectedId(event: Event) {
    this.selectedId = +(event.target as HTMLInputElement).value;
  }

  public deleteListing() {
    if (this.selectedId !== null) {
      this.listingService.deleteListing(this.selectedId)
        .subscribe(() => {
          this.getListings();
          this.selectedId = null;
          this.snackbar.open('Annonce supprimée avec succès', 'close', { duration: 2000 });
        });
    }
  }
}
