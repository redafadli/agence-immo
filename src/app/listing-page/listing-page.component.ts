import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { AuthenticationService } from 'src/services/authentication.service';
import { FavoriteService } from 'src/services/favorite.service';
import { Favorite } from '../favorite';
import { AuthService } from '@auth0/auth0-angular';
import { delay } from 'rxjs';

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
    private authService: AuthService,
    public authenticationService: AuthenticationService,
  ) { }

  @Input() listing?: Listing;

  ngOnInit(): void {
    this.getListing();
    this.checkIfFavorite();
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

  checkIfFavorite(): void {
    let user_email = '';
    const listing_id = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.user$.subscribe(user => {
      user_email = user?.name!;
      // Check if the favorite already exists
      this.favoriteService.getFavoritesByEmail(user_email).subscribe(favorites => {
        const existingFavorite = favorites.find(favorite => favorite.listing_id === listing_id);
        if (existingFavorite) {
          // The favorite already exists, handle accordingly (e.g., show an error message)
          this.isFavorite = true;
        } else {
          // The favorite doesn't exist, add it
          this.isFavorite = false;
        }
      });
    });
  }

  addOrDeleteFavorite(): void {
    const user_email = this.authenticationService.currentUserName;
    const listing_id = this.listing?.id ?? 0;

    // Check if the favorite already exists
    this.favoriteService.getFavoritesByEmail(user_email).subscribe(favorites => {
      const existingFavorite = favorites.find(favorite => favorite.listing_id === listing_id);

      if (existingFavorite) {
        // The favorite already exists, handle accordingly (e.g., show an error message)
        this.favoriteService.deleteFavorite(existingFavorite.id)
          .subscribe(() =>{
            console.log('delete favorite')
            this.checkIfFavorite();
          }) 
      } else {
        // The favorite doesn't exist, add it
        const newFavorite: Favorite = {
          id: 0,
          user_email: user_email,
          listing_id: listing_id
        };

        this.favoriteService.postFavorite(newFavorite).subscribe(() => {
          console.log('Favorite added successfully.');
          delay(2000)
          this.checkIfFavorite();
        });
      }
    });
  }

}
