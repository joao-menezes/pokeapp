import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  favoriteNames: string[] = [];
  favoriteDetails: any[] = [];
  loading = false;

  constructor(
    private favoritesService: FavoritesService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.loading = true;
    try {
      this.favoriteNames = await this.favoritesService.getAllFavorites();

      const detailsPromises = this.favoriteNames.map(name =>
        firstValueFrom(this.pokemonService.getPokemonDetail(name))
          .catch(error => {
            console.error(`Erro ao carregar detalhes de ${name}`, error);
            return null;
          })
      );

      const results = await Promise.all(detailsPromises);
      this.favoriteDetails = results.filter(detail => detail !== null);
    } finally {
      this.loading = false;
    }
  }

  openDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  async toggleFavorite(name: string) {
    await this.favoritesService.toggleFavorite(name);
    await this.loadFavorites();
  }
}
