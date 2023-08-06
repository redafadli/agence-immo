import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class MapsService {

    googleApiUrl = environment.googleApiKey;

    constructor(public httpClient: HttpClient,
    ) { }

    geocodeAddress(address: string): Observable<{ latitude: number, longitude: number }> {
        const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
        const apiKey = this.googleApiUrl;

        const params = {
            address: address,
            key: apiKey,
        };

        return this.httpClient.get<any>(geocodeApiUrl, { params: params })
            .pipe(map(response => {
                if (response.status === 'OK' && response.results.length > 0) {
                    const location = response.results[0].geometry.location;
                    const latitude = location.lat;
                    const longitude = location.lng;
                    return { latitude, longitude };
                } else {
                    throw new Error('Geocoding request failed or no results found.');
                }
            }));
    }
}