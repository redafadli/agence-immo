import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  selectedDate!: Date; // Property to store the selected date
  selectedDatetime!: Date;

  constructor(
    private router : Router,
    public authenticationService: AuthenticationService)
  {}

  goToMaps(){
    //need to go to maps
    this.router.navigate(['/listings']);
  }
}
