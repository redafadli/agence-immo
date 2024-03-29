import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, tap } from "rxjs";
import { Favorite } from "src/app/favorite";

@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private apiUrl = "https://localhost:7102";

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    //GET favorites from the http server
    public getFavoritesByEmail(user_email: string): Observable<Favorite[]> {
        const url = `${this.apiUrl}/favorite/user_email/${user_email}`;
        return this.http.get<Favorite[]>(url)
            .pipe(
                tap(_ => console.log("Favorites of", user_email, "Loaded")),
                catchError(this.handleError<Favorite[]>('getFavorites', []))
            )
    }

    public postFavorite(favorite: Favorite): Observable<Favorite> {
        const url = `${this.apiUrl}/favorite`;
        return this.http.post<Favorite>(url, favorite, this.httpOptions).pipe(
            map(response => {
                return response;
            })
        );
    }

    public deleteFavorite(favorite_id: number): Observable<any> {
        const url = `${this.apiUrl}/favorite/delete/${favorite_id}`;
        return this.http.delete(url, this.httpOptions).pipe(
            tap(_ => console.log("Favorite with id =", favorite_id, "Deleted")),
            catchError(this.handleError<Favorite>('delete favorite failed'))
        );
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