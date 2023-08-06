import { Component, Input } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';
import { Cloudinary } from '@cloudinary/url-gen';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

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

  @Input()
  responses: Array<any>;

  private hasBaseDropZoneOver: boolean = false;
  private uploader: FileUploader;
  private title: string;
  
  constructor(private listingService: ListingService) {}

  public cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dlvlbpl8n',
      apiKey: 'G3aSbl5Pwj07OofpTttmHfBndwU',
    },
  });

  public addProduct(){
    let listing : Listing =  {
      id : 0,
      name : this.name, 
      price : this.price,
      city :  this.city, 
      description : this.description,
      address : this.address,
      image : "https://source.unsplash.com/450x250/?nature"
    };
    this.listingService.postListing(listing);
  }
}
