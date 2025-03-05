import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-district-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, HttpClientModule],
  templateUrl: './district-view.component.html',
  styleUrls: ['./district-view.component.scss'],
})
export class DistrictViewComponent implements OnInit {
  stateName: string = '';
  districts: {
    name: string;
    confirmed: number;
    recovered: number;
    deceased: number;
    image: string;
  }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stateName = params.get('stateName') || '';
      this.loadDistricts();
    });
  }

  loadDistricts(): void {
    this.http.get('assets/data/covid_data.json').subscribe((data: any) => {
      const stateData = data[this.stateName]?.districtData;
      if (stateData) {
        this.districts = Object.keys(stateData).map((districtName) => {
          const district = stateData[districtName];
          return {
            name: districtName,
            confirmed: district.confirmed,
            recovered: district.recovered,
            deceased: district.deceased,
            image: `assets/images/state-b.png`,
          };
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/state']);
  }
}
