import { initialPortfolioConstant, InvestmentModel } from "./investment";


export interface PortfolioState {
  investments: InvestmentModel[];
}

export const initialPortfolioState: PortfolioState = {
  investments: [...initialPortfolioConstant],
};