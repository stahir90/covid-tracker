import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-state-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './state-view.component.html',
  styleUrls: ['./state-view.component.scss'],
})
export class StateViewComponent {
  states = [
    {
      name: 'State A',
      confirmed: 1000,
      recovered: 800,
      deceased: 200,
      image: 'assets/images/state-a.png',
    },
    {
      name: 'State B',
      confirmed: 1500,
      recovered: 1200,
      deceased: 300,
      image: 'assets/images/state-b.png',
    },
    {
      name: 'State C',
      confirmed: 2000,
      recovered: 1800,
      deceased: 200,
      image: 'assets/images/state-c.png',
    },
    {
      name: 'State D',
      confirmed: 2500,
      recovered: 2200,
      deceased: 300,
      image: 'assets/images/state-d.png',
    },
  ];

  constructor(private router: Router) {}

  onStateClick(state: any) {
    this.router.navigate(['/state', state.name]);
  }
}
