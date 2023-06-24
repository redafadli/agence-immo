import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { AuthenticationService } from 'src/services/authentication.service';
import { FavoriteService } from 'src/services/favorite.service';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent {

  public currentUsername: string | undefined;
  public isFavorite: boolean = false;
  private favorites: Favorite[] = [];

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private favoriteService: FavoriteService,
    public authenticationService: AuthenticationService,
  ) { }

  @Input() listing?: Listing;

  ngOnInit(): void {
    this.getListing();
    this.getFavorites();
    this.checkFavorite();
  }

  getListing(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.listingService.getListingById(id)
      .subscribe(listing =>
        this.listing = listing);
  }

  scrollToContactForm() {
    document.getElementById("contact_form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  checkFavorite(): void {
    const listingId = this.listing?.id;
    if (listingId) {
      this.isFavorite = this.favorites.some(favorite => favorite.listing_id === listingId);
    }
  }

  getFavorites(): void {
    const user_email = String(this.route.snapshot.paramMap.get('user_email'));
    this.favoriteService.getFavoritesByEmail(user_email)
      .subscribe(favorites =>
        this.favorites = favorites);
  }

  addToFavorites(): void {
    const user_email = this.authenticationService.currentUserName;
    const listing_id = this.listing?.id ?? 0;

    // Check if the favorite already exists
    this.favoriteService.getFavoritesByEmail(user_email).subscribe(favorites => {
      const existingFavorite = favorites.find(favorite => favorite.listing_id === listing_id);

      if (existingFavorite) {
        // The favorite already exists, handle accordingly (e.g., show an error message)
        console.log('Favorite already exists.');
      } else {
        // The favorite doesn't exist, add it
        const newFavorite: Favorite = {
          id: 0,
          user_email: user_email,
          listing_id: listing_id
        };

        this.favoriteService.postFavorite(newFavorite).subscribe(() => {
          console.log('Favorite added successfully.');
        });
      }
    });
  }

}
