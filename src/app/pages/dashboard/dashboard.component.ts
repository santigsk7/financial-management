import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { InvestmentModel } from 'src/app/state/investment';
import { selectAllInvestments } from '../../state/portfolio.selector';
import { Store } from '@ngrx/store';
import { addInvestment } from 'src/app/state/portfolio.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  




  portfolio$: Observable<InvestmentModel[]>;
  totalInvestmentTail: InfoTile = {
    title: 'Total Investment',
    value: 0,
    icon: 'account_balance',
  };
  todayInvestmentTail: InfoTile = {
    title: 'Today Investment',
    value: 0,
    icon: 'today',
  };
  recentPurchaseStock: InfoTile = {
    title: 'Recent Invested Item',
    value: 'NA',
    icon: 'update',
  };
  recentPurchaseto: InfoTile = {
    title: 'Recent Expenses',
    value: 0,
    icon: 'paid',
  };
  constructor(private _store: Store){
    this.portfolio$ = this._store.select(selectAllInvestments);
    this.portfolio$.subscribe((investmentRes:InvestmentModel[]) => {
      let sortedList = [...investmentRes].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      this.totalInvestmentTail.value = sortedList.reduce((acc, item) => acc + (item.price * item.quantity), 0);  
      this.todayInvestmentTail.value = sortedList.filter(item => {
        let today = new Date();
        return item.date.getDate() === today.getDate() && item.date.getMonth() === today.getMonth() && item.date.getFullYear() === today.getFullYear();
      }).reduce((acc, item) => acc + (item.price * item.quantity), 0);
      if(sortedList.length > 0) {
        this.recentPurchaseto.value = sortedList[0].price * sortedList[0].quantity;
        this.recentPurchaseStock.value = sortedList[0].assetName;
      }
    });
  }
 
  ngOnInit() {

  }
  
}


interface InfoTile {
  title: string;
  value: any;
  icon: string;
}