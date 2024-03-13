import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'parcels',
    loadChildren: () =>
      import('./features/parcels/parcels.module').then((m) => m.ParcelsModule),
  },
  { path: '', redirectTo: 'parcels', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
