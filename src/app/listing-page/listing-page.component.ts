import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent {

  constructor(
    private route : ActivatedRoute,
    private listingService: ListingService,
  ){}

  @Input() listing? : Listing;

  ngOnInit() : void {
    this.getListing();
  }

  getListing() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.listingService.getListing(id).subscribe(listing => this.listing = listing);
  }
}
