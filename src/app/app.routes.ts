import { Routes } from '@angular/router';
import { StateViewComponent } from './state-view/state-view.component';
import { DistrictViewComponent } from './district-view/district-view.component';

// Define the list of all possible state names
const stateNames = ['StateA', 'StateB', 'StateC', 'StateD'];

// Function to provide prerender parameters
export function getPrerenderParams() {
  return stateNames.map((stateName) => ({ stateName }));
}

export const routes: Routes = [
  { path: 'state', component: StateViewComponent },
  {
    path: 'state/:stateName',
    component: DistrictViewComponent,renderMode: 'manual',
    providers: [
      {
        provide: 'getPrerenderParams',
        useValue: getPrerenderParams,
      },
    ],
  },
  { path: '', redirectTo: '/state', pathMatch: 'full' },
  { path: '**', redirectTo: '/state' },
];
