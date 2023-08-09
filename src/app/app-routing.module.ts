import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ListingsComponent } from './listings/listings.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { FavoritesComponent } from './favorites/favorites.component';
import { DeleteListingComponent } from './delete-listing/delete-listing.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'accueil', component: HomeComponent },
  { path: 'apropos', component: AboutComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'detail/:id', component: ListingPageComponent},
  { path: 'log-in', component: LogInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'favorites/:user_email', component: FavoritesComponent},
  { path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      { path: 'add-listing', component: AddListingComponent },
      { path: 'edit-listing', component: EditListingComponent },
      { path: 'delete-listing', component: DeleteListingComponent},
      { path: 'analytics', component: AnalyticsComponent }
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
