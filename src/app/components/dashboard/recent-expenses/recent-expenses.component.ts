import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModifyExpenseComponent } from 'src/app/modal/modify-expense/modify-expense.component';
import { InvestmentModel } from 'src/app/state/investment';
import { addInvestment } from 'src/app/state/portfolio.action';
import { selectAllInvestments } from 'src/app/state/portfolio.selector';

@Component({
  selector: 'app-recent-expenses',
  templateUrl: './recent-expenses.component.html',
  styleUrls: ['./recent-expenses.component.scss']
})
export class RecentExpensesComponent implements OnInit {
  displayedColumns: string[] = ['sno','id','assetName','assetType', 'price', 'quantity','edit'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  recentExpensesTableSource = new MatTableDataSource<InvestmentModel>();
  investmentList$: Observable<InvestmentModel[]>;
  investments: InvestmentModel[] = [];
  constructor(private store: Store,public dialog: MatDialog) { 
    this.investmentList$ = this.store.select(selectAllInvestments);
    this.investmentList$.subscribe((data) => {
      this.investments = [...data];
      this.recentExpensesTableSource.data = this.investments;
      this.recentExpensesTableSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.recentExpensesTableSource.paginator = this.paginator;
  }
  openAddInvestmentModal(isEditMode: boolean=false, investment?: InvestmentModel) {
   
    if(isEditMode) {
      let dialogRef = this.dialog.open(ModifyExpenseComponent,{data: {isEditMode: isEditMode,investment: investment,isDeleteInfo:false}});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }else{
       let id = new Date().getTime();
      let investment: InvestmentModel = {
        id: id,
        assetType: 'Stock',
        quantity: 10,
        price: 200,
        assetName:'Apple',
        date: new Date()
      };
      
      let dialogRef = this.dialog.open(ModifyExpenseComponent,{data: {isEditMode: isEditMode,investment: investment,isDeleteInfo:false}});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  


  }
  deleteInvestment(investment: InvestmentModel) {
    // this.investments = this.investments.filter((investment) => investment.id !== id);
    // this.recentExpensesTableSource.data = this.investments;
    const dialogRef = this.dialog.open(ModifyExpenseComponent,{data: {isEditMode: false,investment: investment,isDeleteInfo:true}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
