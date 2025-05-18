import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AssetType } from 'src/app/state/investment';
import { addInvestment, deleteInvestment, updateInvestment } from 'src/app/state/portfolio.action';


@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.scss']
})
export class ModifyExpenseComponent implements OnInit {
  assetTypeList: AssetType[] = [
    { value: 'Stock', label: 'Stock' },
    { value: 'Mutual Fund', label: 'Mutual Fund' },
    { value: 'Bond', label: 'Bond' },
    { value: 'ETF', label: 'ETF' },
    { value: 'Crypto', label: 'Crypto' }
  ];
  isConfirmedAndModify: boolean = false;
  addInvestmentForm: FormGroup = new FormGroup({
    assetType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required,Validators.min(1)]),
    quantity: new FormControl('', [Validators.required,Validators.min(1)]),
    assetName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
  });
  constructor(public _dialog:MatDialogRef<ModifyExpenseComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private _portfolioService: PortfolioService, private _store:Store) { 
    if(this.data.isEditMode) {
      this.addInvestmentForm.patchValue({
        assetType: this.data.investment.assetType,
        price: this.data.investment.price,
        quantity: this.data.investment.quantity,
        assetName: this.data.investment.assetName,
        date: this.data.investment.date
      });
    }
  }

  ngOnInit(): void {
  }
  closeDialog() {
    this._dialog.close();
  }
  changeModifyStatus() {
    this.isConfirmedAndModify = !this.isConfirmedAndModify;
  }
  addInvestment() {
    let form = this.addInvestmentForm.value;
    let investment = {
      id: new Date().getTime(),
      assetType: form.assetType,
      price: form.price,
      quantity: form.quantity,
      assetName: form.assetName,
      date: form.date
    };
    this._portfolioService.addInvestment(investment).subscribe((res:any) => {
      this._store.dispatch(addInvestment({ investment }));
      this._dialog.close({isAdded:true});
    }, (error:Error) => {
      console.log(error);
      this._dialog.close({isAdded:false});
    });
  }
  updateInvestment() {
    let form = this.addInvestmentForm.value;
    let investment = {
      id: this.data.investment.id,
      assetType: form.assetType,
      price: form.price,
      quantity: form.quantity,
      assetName: form.assetName,
      date: form.date
    };
    this._portfolioService.updateInvestment(investment).subscribe((res:any) => {
      this._store.dispatch(updateInvestment({ investment }));
      this._dialog.close({isUpdated:true});
    }, (error:Error) => {
      console.log(error);
      this._dialog.close({isUpdated:false});
    });
  }
  deleteInvestment(){
    this._portfolioService.deleteInvestment(this.data.investment).subscribe((res:any) => {
      this._store.dispatch(deleteInvestment({ id: this.data.investment.id }));
      this._dialog.close({isDeleted:true});
    }, (error:Error) => {
      console.log(error);
      this._dialog.close({isDeleted:false});
    });
  }
}
