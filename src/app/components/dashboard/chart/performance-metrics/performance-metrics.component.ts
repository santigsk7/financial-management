import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Observable } from 'rxjs';
import { InvestmentModel } from 'src/app/state/investment';
import { selectAllInvestments } from 'src/app/state/portfolio.selector';
import { modifyListForMarketTrend, modifyListForPerformanceMetric } from 'src/app/util/utility';

@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss']
})
export class PerformanceMetricsComponent implements OnInit {

    // === Performance Metrics (Bar) ===
    performanceLabels: string[] = [];
    performanceData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [
       
      ],
    };
  
    // === Shared Chart Options ===
    chartOptions: ChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  portfolio$: Observable<InvestmentModel[]>;
    constructor(private _store: Store) {
      this.portfolio$ = this._store.select(selectAllInvestments);
      this.portfolio$.subscribe((investmentRes: InvestmentModel[]) => {
        let performanceMetricMappedObj = modifyListForPerformanceMetric(investmentRes);
        this.performanceData = {
          labels: performanceMetricMappedObj.performanceMetricsLabels,
          datasets: performanceMetricMappedObj.performanceMetricsAllocationData
        };
      });
    }

  ngOnInit(): void {
  }

}
