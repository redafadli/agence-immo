import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { FavoriteService } from 'src/services/favorite.service';
import { Favorite } from '../favorite';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  public cols = 3;
  
  @Input() listings: Listing[] = [];
  @Input() favorites: Favorite[] = [];

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    private listingService: ListingService,
    public authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) { }


  ngOnInit(): void {
    this.getFavorites();
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

  getFavorites(): void {
    const user_email = String(this.route.snapshot.paramMap.get('user_email'));
    this.favoriteService.getFavoritesByEmail(user_email)
      .subscribe(favorites =>
        this.favorites = favorites);
  }

  getListings() : void {
    let listings: Listing[] = [];
    for (let favorite of this.favorites) {
      this.listingService.getListingById(favorite.id)
        .subscribe(listing =>
          listings.push(listing));
    }
    this.listings = listings;
  }
}
