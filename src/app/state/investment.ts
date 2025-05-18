import * as moment from "moment";


export interface InvestmentModel {
    id: number;
    assetType: string;
    quantity: number;
    price: number;
    assetName: string;
    date: Date;
  }

  export const initialPortfolioConstant:InvestmentModel[] = [
    {
        id: 1,
        assetType: 'Stock',
        quantity: 20,
        price: 300,
        assetName: 'Reliance Petrolium',
        date: moment("2025-01-20").toDate()
    },
    {
      id: 2,
      assetType: 'Crypto',
      quantity: 100,
      price: 100,
      assetName: 'Ethereum',
      date: new Date('2025-04-30')
    },{
      id: 3,
      assetType: 'ETF',
      quantity: 20,
      price: 300,
      assetName: 'Gold bees',
      date: new Date('2025-03-20')
  },
  {
    id: 4,
    assetType: 'Bond',
    quantity: 100,
    price: 100,
    assetName: 'Muthoot Finance - NCD',
    date: new Date('2025-04-30')
  },
  ];

  export interface AssetType{
    label: string;
    value: string;
  }