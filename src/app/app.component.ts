import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from 'src/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'agence-immo';
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.handleRedirectCallback();
  }

  ngAfterViewInit() {
  }
}
