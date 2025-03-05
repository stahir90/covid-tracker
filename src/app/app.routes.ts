import { Routes } from '@angular/router';
import { StateViewComponent } from './state-view/state-view.component';
import { DistrictViewComponent } from './district-view/district-view.component';

export const routes: Routes = [
  { path: 'state', component: StateViewComponent },
  { path: 'district', component: DistrictViewComponent },
  { path: '', redirectTo: '/state', pathMatch: 'full' },
  { path: '**', redirectTo: '/state' },
];
