import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import {FavoritesService} from "../../services/favorites.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  limit = 20;
  offset = 0;
  loading = false;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (res) => {
        this.pokemons = [...this.pokemons, ...res.results];
        this.offset += this.limit;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  isFavorite(name: string): boolean {
    return this.favoritesService.isFavorite(name);
  }

  async toggleFavorite(name: string) {
    await this.favoritesService.toggleFavorite(name);
  }

  openDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  onScroll(event: any) {
    const threshold = 150;
    const position = event.target.scrollTop + event.target.offsetHeight;
    const height = event.target.scrollHeight;

    if (position > height - threshold) {
      this.loadPokemons();
    }
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
}
