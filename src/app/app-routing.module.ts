import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { ListingsComponent } from './listings/listings.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'accueil', component: HomeComponent },
  { path: 'apropos', component: AboutComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'detail/:id', component: ListingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
