import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { AuthenticationService } from 'src/services/authentication.service';
import { FavoriteService } from 'src/services/favorite.service';
import { Favorite } from '../favorite';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent {
  
  currentUsername : string| undefined;
  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private favoriteService: FavoriteService,
    public authenticationService: AuthenticationService,
  ) {
   }

  @Input() listing?: Listing;

  ngOnInit(): void {
    this.getListing();
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

  addToFavorites() {
    let newFavorite : Favorite = {
      id: 0,
      user_email: this.authenticationService.currentUserName,
      listing_id: this.listing?.id ?? 0
    };
    this.favoriteService.postFavorite(newFavorite)
  }
}

