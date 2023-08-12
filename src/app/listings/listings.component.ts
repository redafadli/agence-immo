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
  private originalListings: Listing[] = [];
  isForRentSelected: boolean = false;
  isForSaleSelected: boolean = false;
  listingsPerPage = 12;
  currentPage = 1;
  totalPages!: number;
  paginatedListings: any[] = [];
  totalPagesArray: number[] = [];

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
      this.totalPages = Math.ceil(this.listings.length / this.listingsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      this.updatePaginatedListings();
  }

  updatePaginatedListings(): void {
    const startIndex = (this.currentPage - 1) * this.listingsPerPage;
    const endIndex = startIndex + this.listingsPerPage;
    this.paginatedListings = this.listings.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updatePaginatedListings();
    }
  }

  getListings(): void {
    this.listingService.getListings().subscribe((listings) => {
      this.listings = listings;
      // Save the original list of listings
      this.originalListings = [...listings];
  
      // Calculate total pages and setup pagination
      this.totalPages = Math.ceil(this.listings.length / this.listingsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      this.updatePaginatedListings();
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
  
    // Update pagination after filtering
    this.totalPages = Math.ceil(this.listings.length / this.listingsPerPage);
    this.currentPage = 1; // Reset to first page
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    this.updatePaginatedListings();
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
  
    // Update pagination after filtering
    this.totalPages = Math.ceil(this.listings.length / this.listingsPerPage);
    this.currentPage = 1; // Reset to first page
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    this.updatePaginatedListings();
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
  
    // Update pagination after filtering
    this.totalPages = Math.ceil(this.listings.length / this.listingsPerPage);
    this.currentPage = 1; // Reset to first page
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    this.updatePaginatedListings();
  }
  
}
