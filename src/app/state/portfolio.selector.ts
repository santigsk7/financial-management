import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.state';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectAllInvestments = createSelector(
  selectPortfolioState,
  (state) => state.investments
);