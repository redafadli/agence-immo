import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Listing } from "src/app/listing";
import { LISTINGS } from "src/app/mock-listings";

@Injectable({
    providedIn: 'root'
})
export class ListingService {

    getListings(): Observable<Listing[]> {
        const listings = of(LISTINGS);
        return listings;
    }

    getHero(id : number) : Observable<Listing> {
        const listing = LISTINGS.find(listing => listing.id === id)!;
        return of(listing);
    }
}