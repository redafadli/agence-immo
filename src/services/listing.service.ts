import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Listing } from "../app/listing";

@Injectable({
    providedIn: 'root'
})
export class ListingService {

    private apiUrl = "https://localhost:7102";

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    //GET listings from the http server
    public getListings(): Observable<Listing[]> {
        return this.http.get<Listing[]>(this.apiUrl)
            .pipe(
                tap(_ => console.log("Listings Loaded")),
                catchError(this.handleError<Listing[]>('getListings', []))
            )
    }

    //GET one listing from the http server
    public getListingById(id: number): Observable<Listing> {
        const url = `${this.apiUrl}/listing/${id}`
        return this.http.get<Listing>(url).pipe(
            tap(_ => console.log(`Got listing id=${id}`)),
            catchError(this.handleError<Listing>(`GetListing id=${id}`))
        );
    }

    // POST one listing to the http server
    public postListing(listing: Listing){
        const url = `${this.apiUrl}/listing`;
        return this.http.post<Listing>(url, listing, this.httpOptions).subscribe();
    }

    // PUT edit listing
    public updateListing(listing: Listing): Observable<Listing> {
        return this.http.put<Listing>(this.apiUrl, listing, this.httpOptions).pipe(
            tap(_ => console.log(`Updated listing id=${listing.id}`)),
            catchError(this.handleError<any>('UpdateListing'))
        );
    }

    public deleteListing(id: Number) : Observable<Listing[]> {
        const url = `${this.apiUrl}/deleteListing/${id}`
        return this.http.delete<Listing[]>(url, this.httpOptions);
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