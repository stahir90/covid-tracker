import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-district-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './district-view.component.html',
  styleUrls: ['./district-view.component.scss'],
})
export class DistrictViewComponent {
  stateName: string = '';
  districts = [
    {
      name: 'District 1',
      confirmed: 500,
      recovered: 400,
      deceased: 100,
      image: 'assets/images/district-1.png',
    },
    {
      name: 'District 2',
      confirmed: 600,
      recovered: 500,
      deceased: 100,
      image: 'assets/images/district-2.png',
    },
    {
      name: 'District 3',
      confirmed: 700,
      recovered: 600,
      deceased: 100,
      image: 'assets/images/district-3.png',
    },
  ];

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.stateName = state['stateName'];
    }
  }

  goBack() {
    this.router.navigate(['/state']);
  }
}
