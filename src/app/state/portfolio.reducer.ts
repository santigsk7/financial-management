import { createReducer, on } from '@ngrx/store';
import { initialPortfolioState } from './portfolio.state';
import * as PortfolioActions from './portfolio.action';
import { InvestmentModel } from './investment';

export const portfolioReducer = createReducer(
  initialPortfolioState,
  on(PortfolioActions.addInvestment, (state, { investment }) => ({
    ...state,
    investments: [...state.investments, investment],
  })),
  on(PortfolioActions.loadInvestmentsSuccess, (state, { investments }) => ({
    ...state,
    investments,
  })),
  on(PortfolioActions.updateInvestment, (state, { investment }) => ({
    ...state,
    investments:[...state.investments].map((inv:InvestmentModel)=>{ 
        if(inv.id===investment.id){
            return investment;
        }else{
            return inv;
        }
    }),
  })),
  on(PortfolioActions.deleteInvestment, (state, { id }) => ({
    ...state,
    investments:[...state.investments].filter((investment:InvestmentModel)=>{ 
        return investment.id !== id;
    })
    }),
  ),
);