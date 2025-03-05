import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-district-view',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './district-view.component.html',
  styleUrls: ['./district-view.component.scss'],
})
export class DistrictViewComponent implements OnInit {
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

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stateName = params.get('stateName') || '';
    });
  }

  goBack() {
    this.router.navigate(['/state']);
  }
}
