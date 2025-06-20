// src/app/core/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageReady = false;
  private FAVORITES_KEY = 'favorite_pokemons';
  private favorites: Set<string> = new Set();

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    this.storageReady = true;
    const saved = await this.storage.get(this.FAVORITES_KEY);
    if (saved) {
      this.favorites = new Set(saved);
    }
  }

  isFavorite(name: string): boolean {
    return this.favorites.has(name);
  }

  async toggleFavorite(name: string): Promise<void> {
    if (this.favorites.has(name)) {
      this.favorites.delete(name);
    } else {
      this.favorites.add(name);
    }
    await this.storage.set(this.FAVORITES_KEY, Array.from(this.favorites));
  }

  async getAllFavorites(): Promise<string[]> {
    if (!this.storageReady) await this.init();
    return Array.from(this.favorites);
  }
}
