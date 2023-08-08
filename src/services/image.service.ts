import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ImageUrl } from "src/app/image-url";

@Injectable({
    providedIn: 'root'
})

export class ImageService {

    constructor(private http: HttpClient) { }

    private apiUrl = "https://localhost:7102";

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    // POST one listing to the http server
    public uploadImage(inputImageUrl : any) {
        const url = `${this.apiUrl}/upload`;
        return this.http.post<ImageUrl>(url, inputImageUrl, this.httpOptions);
      }
}