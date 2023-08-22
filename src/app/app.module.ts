import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { ItemsCarouselComponent } from './items-carousel/items-carousel.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from './footer/footer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NgChartsModule } from 'ng2-charts';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AuthModule } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { CloudinaryModule } from '@cloudinary/ng';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DeleteListingComponent } from './delete-listing/delete-listing.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, NavigationBarComponent, ItemsCarouselComponent, FooterComponent, AdminDashboardComponent, ContactComponent, AboutComponent, ListingsComponent, ListingPageComponent, AddListingComponent, EditListingComponent, AnalyticsComponent, ContactFormComponent, FavoritesComponent, DeleteListingComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    MatGridListModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    SlickCarouselModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    CloudinaryModule,
    AuthModule.forRoot({
      domain: 'dev-8mfwog6rw2cpo7w5.us.auth0.com',
      clientId: 'ZC0Er65i82Lqdjk9LlWIaYqFTnjCLo23',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
