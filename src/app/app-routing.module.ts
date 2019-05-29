import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './places/dashboard/dashboard.module#DashboardPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'deliveryDetails',
    loadChildren: './places/dashboard/delivery-details/delivery-details.module#DeliveryDetailsPageModule'
  },
  {
    path: 'amounts',
    children: [
      {
        path: '',
        loadChildren: './places/dashboard/amounts/amounts.module#AmountsPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
