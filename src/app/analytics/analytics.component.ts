import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  listings: Listing[] = [];
  private cities: string[] = [];
  private counts: number[] = [];

  constructor(private listingService: ListingService) { }

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };

  ngOnInit() {
    this.getListings();
  }

  private getListings(): void {
    this.listingService.getListings()
      .subscribe(listings => {
        this.listings = listings;
        this.updateChartData();
      });
  }

  updateChartData(): void {
    const cityCounts: { [key: string]: number } = {};

    // Count the occurrences of each city
    this.listings.forEach((listing) => {
      const city = listing.city;
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    // Extract cities and counts for chart data
    this.cities = Object.keys(cityCounts);
    this.counts = Object.values(cityCounts);

    // Set lineChartData after populating cities and counts
    this.lineChartData = {
      labels: this.cities,
      datasets: [
        {
          data: this.counts,
          label: 'Annonces par ville',
          fill: true,
          borderColor: 'black',
          backgroundColor: '#F6E7DF',
        }
      ]
    };
  }

  public lineChartData!: ChartConfiguration<'line'>['data'];
}
