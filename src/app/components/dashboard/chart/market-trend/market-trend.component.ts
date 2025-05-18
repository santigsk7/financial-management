import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Observable } from 'rxjs';
import { InvestmentModel } from 'src/app/state/investment';
import { selectAllInvestments } from 'src/app/state/portfolio.selector';
import { getRandomColor, modifyListForMarketTrend } from 'src/app/util/utility';

@Component({
  selector: 'app-market-trend',
  templateUrl: './market-trend.component.html',
  styleUrls: ['./market-trend.component.scss']
})
export class MarketTrendComponent implements OnInit {

  // === Market Trends (Line) ===
  marketTrendLabels: string[] = [];

  marketTrendData: ChartConfiguration<'line'>['data'] = {
    labels: this.marketTrendLabels,
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
      let marketTrendMappedObj = modifyListForMarketTrend(investmentRes);
      this.marketTrendData = {
        labels: marketTrendMappedObj.marketTrendLabels,
        datasets: marketTrendMappedObj.marketTrendAllocationData
      };
    });
  }

  ngOnInit(): void {
  }

}
