import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { FavoritesPage } from './favorites.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;
  let storage: Storage;

  const favoritePokemonsMock = ['pikachu', 'bulbasaur'];

  const storageMock = {
    create: () => Promise.resolve(storageMock),
    get: (key: string) => Promise.resolve(favoritePokemonsMock),
    set: (key: string, value: any) => Promise.resolve(),
    remove: (key: string) => Promise.resolve(),
    clear: () => Promise.resolve(),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FavoritesPage,
        HttpClientTestingModule,
        RouterTestingModule,
        IonicStorageModule.forRoot(),
      ],
      providers: [
        { provide: Storage, useValue: storageMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
    storage = TestBed.inject(Storage);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
