import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IdToken } from '@auth0/auth0-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AuthService, private router: Router) {}

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

  getUserRoles(): Promise<string[]> {
    return this.auth.idTokenClaims$.pipe(
      map((claims: IdToken | null | undefined) => {
        if (!claims) {
          return [];
        }
        return claims['https://dev-8mfwog6rw2cpo7w5.us.auth0.com/roles'] || [];
      })
    ).toPromise();
  }

  async hasRole(role: string): Promise<boolean> {
    const userRoles = await this.getUserRoles();
    return userRoles.includes(role);
  }
}
