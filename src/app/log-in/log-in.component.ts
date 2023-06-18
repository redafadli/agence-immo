import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authenticationService: AuthenticationService
    ) {}

    login(): void {
      this.authenticationService.login();
    }
  
    logout(): void {
      this.authenticationService.logout();
    }
}
