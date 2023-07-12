import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { Appointment } from "src/app/appointment";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationAppointment {

    private apiUrl = "https://localhost:7102";

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    //GET Appointments from the http server
    public getAppointments(): Observable<Appointment[]> {
        const url = `${this.apiUrl}/appointments`
        return this.http.get<Appointment[]>(url)
            .pipe(
                tap(_ => console.log("Appointments Loaded")),
                catchError(this.handleError<Appointment[]>('getAppointments', []))
            )
    }

    // POST one appointment to the http server
    public postAppointment(appointment: Appointment) {
        const url = `${this.apiUrl}/Appointment`;
        return this.http.post(url, appointment, this.httpOptions)
            .subscribe()
    }


    //GET appointments from the http server
    public getAppointmentsByEmail(user_email: string): Observable<Appointment[]> {
        const url = `${this.apiUrl}/appointment/user_email/${user_email}`;
        return this.http.get<Appointment[]>(url)
            .pipe(
                tap(_ => console.log("Appointments of", user_email, "Loaded")),
                catchError(this.handleError<Appointment[]>('getAppointments', []))
            )
    }

    //GET one appointment from the http server
    public getAppointmentById(id: number): Observable<Appointment> {
        const url = `${this.apiUrl}/appointment/id/${id}`
        return this.http.get<Appointment>(url).pipe(
            tap(_ => console.log(`Got appointment id=${id}`)),
            catchError(this.handleError<Appointment>(`GetAppointment id=${id}`))
        );
    }

    public deleteAppointment(id: Number): Observable<Appointment> {
        const url = `${this.apiUrl}/appointment/delete/${id}`
        return this.http.delete<Appointment>(url, this.httpOptions).pipe(
            tap(_ => console.log(`Deleted appointment id=${id}`)),
            catchError(this.handleError<Appointment>('deleteHero'))
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