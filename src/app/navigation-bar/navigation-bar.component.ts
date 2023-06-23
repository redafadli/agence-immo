import { Component } from '@angular/core';
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
  userName : string | undefined;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public auth: AuthService,
  ) {
    this.auth.user$.subscribe((user) => {
      this.userName = user?.name;
    });
  }

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

  isAdmin(email: string): boolean {
    return /@micasa.be\s*$/.test(email);
  }
}
