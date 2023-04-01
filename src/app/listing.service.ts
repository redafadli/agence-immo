import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { Listing } from "./listing";

@Injectable({
    providedIn: 'root'
})
export class ListingService {

    private listingsUrl = 'https://localhost:7102';

    httpOptions = {
        headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    constructor(
        private http: HttpClient
    ){}

    //GET listings from the http server
    getListings(): Observable<Listing[]>{
        return this.http.get<Listing[]>(this.listingsUrl)
            .pipe(
                tap(_ => console.log("Listings Loaded")),
                catchError(this.handleError<Listing[]>('getListings',[]))
            )
    }

    getListing(id: number): Observable<Listing> {
        const url = `${this.listingsUrl}/${id}`
        return this.http.get<Listing>(url).pipe(
            tap(_ => console.log(`Got listing id=${id}`)),
            catchError(this.handleError<Listing>(`GetListing id=${id}`))
        );
    }

    updateListing(listing: Listing): Observable<any>{
        return this.http.put(this.listingsUrl, listing, this.httpOptions).pipe(
            tap(_ => console.log(`Updated listing id=${listing.id}`)),
            catchError(this.handleError<any>('UpdateListing'))
        )
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}