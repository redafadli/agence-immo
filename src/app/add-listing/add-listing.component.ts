import { Component, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';
import { Cloudinary } from '@cloudinary/url-gen';
import { ImageService } from 'src/services/image.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.scss']
})
export class AddListingComponent {
  public name!: string;
  public price!: number;
  public city!: string;
  public description!: string;
  public address!: string;
  public images : string[] = [];

  constructor(private listingService: ListingService,
    private imageService: ImageService) {
    const cld = new Cloudinary({ cloud: { cloudName: 'dlvlbpl8n' } });
  }

  selectedFiles!: FileList;

  public selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const reader = new FileReader();  // Create a new reader for each iteration
  
      reader.onload = () => {
        this.imageService.uploadImage({ inputImage: reader.result, imageUri: '' }).subscribe(imageUrl => {
          this.images.push(imageUrl.imageUri);
        });
      };
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }

  public async addProduct() {
    await this.uploadFiles();  // Wait for images to be uploaded
    
    let listing: Listing = {
      id: 0,
      name: this.name,
      price: this.price,
      city: this.city,
      description: this.description,
      address: this.address,
      imageUrls: this.images
    };
    
    await this.listingService.postListing(listing);  // Wait for listing to be posted
  }  
}
