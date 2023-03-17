import { Component } from '@angular/core';
import { Listing } from '../listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent {

  listings : Listing[] = [];

}
