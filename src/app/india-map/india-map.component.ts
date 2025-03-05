import { Component, AfterViewInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.scss'],
})
export class IndiaMapComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.drawMap();
  }

  drawMap(): void {
    const width = 975;
    const height = 610;

    const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', this.zoomed);

    const svg = d3
      .select(this.elementRef.nativeElement)
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'max-width: 100%; height: auto;')
      .on('click', this.reset);

    const path = d3.geoPath();

    const g = svg.append('g');

    // Load TopoJSON data
    d3.json('assets/data/india.json').then((data: any) => {
      const states = g
        .append('g')
        .attr('fill', '#444')
        .attr('cursor', 'pointer')
        .selectAll('path')
        .data(topojson.feature(data, data.objects.states).type)
        .join('path')
        .on('click', this.clicked)
        .attr('d', path as any);

      states.append('title').text((d: any) => d.properties.name);

      g.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr(
          'd',
          path(
            topojson.mesh(
              data,
              data.objects.states,
              (a: any, b: any) => a !== b
            )
          )
        );

      svg.call(zoom as any);
    });
  }

  reset(event: any): void {
    d3.selectAll('path').transition().style('fill', null);
    d3.select(event.currentTarget)
      .transition()
      .duration(750)
      .call((selection: any) =>
        selection.call(
          d3.zoom().transform,
          d3.zoomIdentity,
          d3.zoomTransform(selection.node()).invert([975 / 2, 610 / 2])
        )
      );
  }

  clicked(event: any, d: any): void {
    const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(d);
    event.stopPropagation();
    d3.selectAll('path').transition().style('fill', null);
    d3.select(event.currentTarget).transition().style('fill', 'red');
    d3.select(event.currentTarget.closest('svg'))
      .transition()
      .duration(750)
      .call((selection: any) =>
        selection.call(
          d3.zoom().transform,
          d3.zoomIdentity
            .translate(975 / 2, 610 / 2)
            .scale(
              Math.min(8, 0.9 / Math.max((x1 - x0) / 975, (y1 - y0) / 610))
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, selection.node())
        )
      );
  }

  zoomed(event: any): void {
    const { transform } = event;
    d3.select(event.currentTarget)
      .select('g')
      .attr('transform', transform)
      .attr('stroke-width', 1 / transform.k);
  }
}
