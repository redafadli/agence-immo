import { Component, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';
import { Cloudinary } from '@cloudinary/url-gen';
import { ImageService } from 'src/services/image.service';
import { delay } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent {
  public name!: string;
  public price!: number;
  public city!: string;
  public state!: string;
  public description!: string;
  public address!: string;
  public images: string[] = [];
  public space!: number;
  public rooms!: number;

  constructor(private listingService: ListingService,
    private imageService: ImageService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  selectedFiles!: FileList;

  public selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadFiles() {
    this.snackbar.open("Téléchargement de l'annonce en cours...", 'close', { duration: 3000 });
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imageService.uploadImage({ inputImage: reader.result, imageUri: '' }).subscribe(imageUrl => {
          this.images.push(imageUrl.imageUri);
        });
      };
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }

  public addProduct() {
    this.uploadFiles();

    setTimeout(() => {
      let listing: Listing = {
        id: 0,
        name: this.name,
        price: this.price,
        state: this.state,
        city: this.city,
        description: this.description,
        address: this.address,
        imageUrls: this.images,
        space: this.space,
        rooms: this.rooms,
      };

      if (this.images.length > 0
        && this.price > 0
        && this.state.length > 0
        && this.city.length > 0
        && this.description.length > 0
        && this.address.length > 0
        && this.space > 0
        && this.rooms > 0) {
        this.listingService.postListing(listing);
        this.snackbar.open("L'annonce a été ajoutée avec succès", 'close')
        this.router.navigate(['/listings']);
      } else {
        this.snackbar.open('Veillez remplir tous les champs', 'close', { duration: 500 });
      }
    }, 5000);
  }
}
