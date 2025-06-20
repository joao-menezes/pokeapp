// src/app/features/favorites/favorites.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import {FavoritesService} from "../../services/favorites.service";

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
    this.favoriteNames = await this.favoritesService.getAllFavorites();
    this.favoriteDetails = [];

    for (const name of this.favoriteNames) {
      // Buscar dados completos para cada favorito
      try {
        const details = await this.pokemonService.getPokemonDetail(name).toPromise();
        this.favoriteDetails.push(details);
      } catch (error) {
        console.error(`Erro ao carregar detalhes de ${name}`, error);
      }
    }

    this.loading = false;
  }

  openDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  async toggleFavorite(name: string) {
    await this.favoritesService.toggleFavorite(name);
    await this.loadFavorites();
  }
}
