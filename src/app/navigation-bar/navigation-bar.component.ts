import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(
    private router: Router,
  ) { }

  displayAccueil() {
    this.router.navigate(['/accueil']);
  }

  displayContact() {
    this.router.navigate(['/contact']);
  }

  displayApropos() {
    this.router.navigate(['/apropos']);
  }

  displayListings() {
    this.router.navigate(['/listings']);
  }
  displayAdminDashboard() {
    this.router.navigate(['/admin']);
  }
}
