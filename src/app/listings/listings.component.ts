import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('gridList') gridList!: ElementRef;


  constructor(
    private listingService: ListingService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.getListings();

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
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
      document.getElementById("gridList")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
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

  onSearchCombined(): void {
    this.listings = this.originalListings.filter((listing) =>
      (this.citySearchTerm === '' || listing.city.toLowerCase() === this.citySearchTerm.toLowerCase()) &&
      (this.nameSearchTerm === '' || listing.name.toLowerCase().includes(this.nameSearchTerm.toLowerCase())) &&
      (!this.isForRentSelected || listing.state.toLowerCase() === 'à louer') &&
      (!this.isForSaleSelected || listing.state.toLowerCase() === 'à vendre')
    );

    this.totalPages = Math.ceil(this.listings.length / this.listingsPerPage);
    this.currentPage = 1;
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

    this.onSearchCombined();
  }
}
