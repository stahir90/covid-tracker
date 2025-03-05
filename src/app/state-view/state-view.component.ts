import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-state-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './state-view.component.html',
  styleUrls: ['./state-view.component.scss'],
})
export class StateViewComponent implements OnInit {
  states: {
    name: string;
    confirmed: number;
    recovered: number;
    deceased: number;
    image: string;
  }[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates(): void {
    const stateImages = [
      'assets/images/state-a.png',
      'assets/images/state-b.png',
      'assets/images/state-c.png',
      'assets/images/state-d.png',
      'assets/images/state-e.png',
    ];

    this.http.get('assets/data/covid_data.json').subscribe((data: any) => {
      this.states = Object.keys(data)
        .filter((stateName) => stateName !== 'State Unassigned')
        .map((stateName, index) => {
          const stateData = data[stateName].districtData;
          const totalConfirmed = Object.values(stateData).reduce(
            (sum: number, district: any) => sum + district.confirmed,
            0
          );
          const totalRecovered = Object.values(stateData).reduce(
            (sum: number, district: any) => sum + district.recovered,
            0
          );
          const totalDeceased = Object.values(stateData).reduce(
            (sum: number, district: any) => sum + district.deceased,
            0
          );

          const imageIndex = index % stateImages.length;
          const image = stateImages[imageIndex];

          return {
            name: stateName,
            confirmed: totalConfirmed,
            recovered: totalRecovered,
            deceased: totalDeceased,
            image: image,
          };
        });
    });
  }

  onStateClick(state: any): void {
    this.router.navigate(['/state', state.name]);
  }
}
