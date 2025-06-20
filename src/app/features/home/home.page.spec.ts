import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {PokemonService} from "../../core/services/pokemon.service";
import {importProvidersFrom} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage-angular";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HomePage, HttpClientTestingModule, RouterTestingModule],
      providers: [
        importProvidersFrom(IonicStorageModule.forRoot()),]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
