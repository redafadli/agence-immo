import { Component, ElementRef, HostListener, Inject, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/services/listing.service';
import { Listing } from '../listing';
import { AuthenticationService } from 'src/services/authentication.service';
import { FavoriteService } from 'src/services/favorite.service';
import { Favorite } from '../favorite';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, delay, map } from 'rxjs';
import { environment } from 'src/environment';
import { } from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import { MapsService } from 'src/services/maps.service';

declare var google: any;

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent {

  public currentUsername: string | undefined;
  public isFavorite: boolean = false;
  googleApiUrl = environment.googleApiKey;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    public authenticationService: AuthenticationService,
    public httpClient: HttpClient,
    public mapsService: MapsService,
  ) {}

  @Input() listing!: Listing;
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;

  ngOnInit(): void {
    this.getListing();
    this.checkIfFavorite();
    window.onload = () => {
      this.loadMap();
    };
  }

  ngAfterViewInit(): void {
    // Load google maps script after view init
    const DSLScript = document.createElement('script');
    DSLScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleApiUrl}`;
    DSLScript.type = 'text/javascript';
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
  }
  
  loadMap() {
    const defaultLatLng = new google.maps.LatLng(-34.9290, 138.6010);
    const address = this.listing?.address;
  
    this.mapsService.geocodeAddress(address).subscribe(
      coordinates => {
        const latLng = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        // Add a marker to the map
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Location'
        });
      },
      error => {
        console.error('Error occurred during geocoding:', error);
        // Use default coordinates when geocoding fails
        let mapOptions = {
          center: defaultLatLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      }
    );
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
          .subscribe(() => {
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
