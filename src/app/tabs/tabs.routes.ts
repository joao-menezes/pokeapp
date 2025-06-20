import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../features/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('../features/favorites/favorites.page').then(m => m.FavoritesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'details/:name',
    loadComponent: () =>
      import('../features/details/details.page').then(m => m.DetailsPage),
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
