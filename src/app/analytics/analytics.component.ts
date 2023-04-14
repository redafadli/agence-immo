import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {

  // chartData: ChartDataSets[] = [];
  // chartLabels: Label[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // xAxes: [{
      //   ticks: {
      //     beginAtZero: true
      //   }
      // }]
    }
  };
  chartType: ChartType = 'line';

  

}
