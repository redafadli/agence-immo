import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IdToken, User } from '@auth0/auth0-angular';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUserName: string = '';

  constructor(private auth: AuthService,
    private router: Router,
    private authService: AuthService) {
      this.authService.user$.subscribe(user => {
        this.currentUserName =  user?.name!;
      });
     }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout();
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  handleRedirectCallback(): void {
    this.auth.handleRedirectCallback().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
