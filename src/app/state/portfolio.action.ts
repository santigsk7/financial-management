import { createAction, props } from '@ngrx/store';
import { InvestmentModel } from './investment';

export const addInvestment = createAction(
  '[Portfolio] Add Investment',
  props<{ investment: InvestmentModel }>()
);

export const loadInvestments = createAction('[Portfolio] Load Investments');
export const loadInvestmentsSuccess = createAction(
  '[Portfolio] Load Investments Success',
  props<{ investments: InvestmentModel[] }>()
);
export const updateInvestment = createAction(
  '[Portfolio] Update Investment',
  props<{ investment: InvestmentModel }>()
);
export const deleteInvestment = createAction(
  '[Portfolio] Delete Investment',
  props<{ id: number }>()
);