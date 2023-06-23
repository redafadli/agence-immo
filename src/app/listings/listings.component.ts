import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent {

  public listings: Listing[] = [];
  public cols = 3;

  constructor(private listingService: ListingService,
    private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getListings();

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.cols = 1;
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.cols = 2;
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.cols = 3;
      }
    });
  }

  getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => this.listings = listings);
  }
}
