import { Component } from '@angular/core';
import { Listing } from '../listing';
import { ListingService } from 'src/services/listing.service';


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
  
  constructor(private listingService: ListingService) {}

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
