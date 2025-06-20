// src/app/features/details/details.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  pokemonName?: string;
  pokemonDetails: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonName = this.route.snapshot.paramMap.get('name')!;
    this.loadDetails();
  }

  loadDetails() {
    this.loading = true;
    this.pokemonService.getPokemonDetail(this.pokemonName).subscribe({
      next: (res) => {
        this.pokemonDetails = res;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }
}
