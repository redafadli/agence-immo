import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { FavoriteService } from 'src/services/favorite.service';
import { Favorite } from '../favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  constructor(
    private route: ActivatedRoute,
    private favoriteService: FavoriteService,
    public authenticationService: AuthenticationService,
  ) { }

  @Input() favorites?: Favorite[];

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(): void {
    const user_email = String(this.route.snapshot.paramMap.get('user_email'));
    this.favoriteService.getFavoritesByEmail(user_email)
    .subscribe(favorites =>
      this.favorites = favorites);
  }
}
