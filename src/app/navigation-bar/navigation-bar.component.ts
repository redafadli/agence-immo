import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  
  profileJson: string = "";

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2)),
    );
  }

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
  
  displayLogIn() {
    this.router.navigate(['/log-in']);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
