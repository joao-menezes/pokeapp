import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from './pokemon.service';
import { of } from 'rxjs';
import { HomePage } from '../../features/home/home.page';
import {importProvidersFrom} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage-angular";

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let component: HomePage;
  let pokemonServiceSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PokemonService', ['getPokemons']);

    await TestBed.configureTestingModule({
      imports: [HomePage, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: PokemonService, useValue: spy },
        importProvidersFrom(IonicStorageModule.forRoot()),]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    pokemonServiceSpy = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;

    pokemonServiceSpy.getPokemons.and.returnValue(of({
      results: [
        { name: 'bulbasaur', url: 'url1' },
        { name: 'charmander', url: 'url2' }
      ],
      next: null
    }));
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de pokemons', () => {
    fixture.detectChanges();

    expect(pokemonServiceSpy.getPokemons).toHaveBeenCalled();
    expect(component.pokemons.length).toBe(2);
    expect(component.pokemons[0].name).toBe('bulbasaur');
  });
});
