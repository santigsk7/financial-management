import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Observable } from 'rxjs';
import { InvestmentModel } from 'src/app/state/investment';
import { selectAllInvestments } from 'src/app/state/portfolio.selector';
import { modifyListForAssetAllocation } from 'src/app/util/utility';


@Component({
  selector: 'app-asset-allocation',
  templateUrl: './asset-allocation.component.html',
  styleUrls: ['./asset-allocation.component.scss']
})
export class AssetAllocationComponent implements OnInit {
  assetAllocationLabels: string[] = [];
  assetAllocationData!: ChartConfiguration<'pie'>['data'];

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
    this.portfolio$.subscribe((data) => {
      let assetAllocationMappedObj = modifyListForAssetAllocation(data);
      this.assetAllocationLabels = assetAllocationMappedObj.assetAllocationLabels;
      this.assetAllocationData = {
        labels: assetAllocationMappedObj.assetAllocationLabels,
        datasets: [
          {
            data: assetAllocationMappedObj.assetAllocationData,
            backgroundColor: assetAllocationMappedObj.assetBGColorList,
          }
        ]
      };
    });
  }

  ngOnInit(): void {
  }

}
