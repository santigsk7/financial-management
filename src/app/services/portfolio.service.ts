import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private _http:HttpClient, private _store:Store) { }
  addInvestment(portfolio: any) {
    // Assuming we are making a POST request to the server
    return of({ success: true }); // Mocking a successful response
  }
  updateInvestment(portfolio: any) {
    // Assuming we are making a PUT request to the server
    return of({ success: true }); // Mocking a successful response
  }
  deleteInvestment(portfolio: any) {
    // Assuming we are making a DELETE request to the server
    return of({ success: true }); // Mocking a successful response
  }
}
