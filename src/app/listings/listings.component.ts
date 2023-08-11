import { Component } from '@angular/core';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { belgiumCities } from 'src/belgium-cities';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss'],
})
export class ListingsComponent {
  public listings: Listing[] = [];
  public cols = 3;
  public citySearchTerm: string = '';
  public nameSearchTerm: string = '';
  public belgiumCities: string[] = belgiumCities;
  isForRentSelected: boolean = false;
  isForSaleSelected: boolean = false;

  // New variable to store the original list of listings
  private originalListings: Listing[] = [];

  constructor(
    private listingService: ListingService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.getListings();

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
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
    this.listingService.getListings().subscribe((listings) => {
      this.listings = listings;
      // Save the original list of listings
      this.originalListings = [...listings];
    });
  }

  onSearchByName(): void {
    const searchTerm = this.nameSearchTerm.toLowerCase().trim();

    if (searchTerm === '') {
      // Reset the listings to the original list when the search term is empty
      this.listings = [...this.originalListings];
    } else {
      // Filter the original list of listings based on the name search term
      this.listings = this.originalListings.filter((listing) =>
        listing.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  onSearchByCity(): void {
    const selectedCity = this.citySearchTerm.toLowerCase().trim();

    if (selectedCity === '') {
      // Reset the listings to the original list when the city search term is empty
      this.listings = [...this.originalListings];
    } else {
      // Filter the original list of listings based on the city search term
      this.listings = this.originalListings.filter((listing) =>
        listing.city.toLowerCase() === selectedCity
      );
    }
  }

  toggleStateFilter(state: string): void {
    if (state === 'À louer') {
      this.isForRentSelected = !this.isForRentSelected;
      this.isForSaleSelected = false;
    } else if (state === 'À vendre') {
      this.isForSaleSelected = !this.isForSaleSelected;
      this.isForRentSelected = false;
    }

    if (!this.isForRentSelected && !this.isForSaleSelected) {
      this.getListings();
    } else {
      this.listings = this.originalListings.filter(
        (listing) => listing.state.toLowerCase() === state.toLowerCase()
      );
    }
  }
}
