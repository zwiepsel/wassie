import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardPageModule'
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: './dashboard/notifications/notifications.module#NotificationsPageModule'
          },
        ]
      },
      {
        path: 'invoices',
        children: [
          {
            path: '',
            loadChildren: './dashboard/invoices/invoices.module#InvoicesPageModule'
          },
        ]
      },
      {
        path: '',
        redirectTo: '/places/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/places/tabs/dashboard',
    pathMatch: 'full'
  },
  { path: 'invoices', loadChildren: './dashboard/invoices/invoices.module#InvoicesPageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule {}
