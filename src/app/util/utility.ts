import * as moment from "moment";
import { InvestmentModel } from "../state/investment";

export const modifyListForAssetAllocation = (listOfInvestment:InvestmentModel[]) =>{
        
        let investTypeList:string[] = [];

        listOfInvestment.forEach((investment:InvestmentModel) => {
            if (!investTypeList.includes(investment.assetType)) {
                investTypeList.push(investment.assetType);
            }
        });

        return {
            assetAllocationLabels: investTypeList,
            assetBGColorList: investTypeList.map(()=>getRandomColor()),
            assetAllocationData: investTypeList.map((type) => {
                let total = 0;
                listOfInvestment.forEach((investment:InvestmentModel) => {
                    if (investment.assetType === type) {
                        total += investment.quantity;
                    }
                });
                return total;
            }),
        };
    }
    export const modifyListForMarketTrend = (listOfInvestment:InvestmentModel[]) =>{
        
        let monthlyValues = recentMonthsTrend(listOfInvestment, 6);
        let portfolioLabels = ['My Portfolio Value', 'NIFTY 500'];
        return {
            marketTrendLabels: Object.keys(monthlyValues),
            marketTrendBGColorList: portfolioLabels.map(()=>getRandomColor()),
            marketTrendAllocationData:portfolioLabels.map((type:any,n:number) => {
                return {
                    label : type,
                    data : Object.values(monthlyValues).map((item) =>{
                        if (item === 0) {
                            return item;
                        } else {
                            return item - (n*0.2*item)// NIFTY 500 is 20% more than my portfolio
                        }
                    }),
                    borderColor: getRandomColor(),
                    fill: false,
                    tension: 0.3,
                };
            })            
        };
    }
    export const modifyListForPerformanceMetric = (listOfInvestment:InvestmentModel[]) =>{
        
        let currentYearTrend = currentYearPerformanceTrend(listOfInvestment);
        let portfolioLabels = ['Portfolio Return (%)', 'Expected Benchmark Return (%)'];
        let performanceMetricsForYears = Array.from({length:5}).map((n,i:number)=>{
            return currentYearTrend * (i*0.5); // 10% increase every year
        });
        return {
            performanceMetricsLabels: performanceMetricsForYears.map((i,n:number)=>(n+1)+" Y"),
            performanceMetricsBGColorList: portfolioLabels.map(()=>getRandomColor()),
            performanceMetricsAllocationData:portfolioLabels.map((type:any,n:number) => {
                return {
                    label: type,
                    data: performanceMetricsForYears.map((item) =>{
                        if (item === 0) {
                            return item;
                        } else {
                            return item - (n*0.2*item)// Expected Benchmark is 20% more than my portfolio
                        }
                    }),
                    backgroundColor: getRandomColor(),
                  }
            })            
        };
    }

  export const getRandomColor = () => {
    var color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
};

    export const recentMonthsTrend = (listOfInvestment:InvestmentModel[],count:number) => {
        const now = moment();
        const monthlyValues: Record<string, number> = {};

        for (let i = count; i >= 0; i--) {
            const month = now.clone().subtract(i, 'months').format('MMM');
            monthlyValues[month] = 0;
        }

        listOfInvestment.forEach((inv:InvestmentModel) => {
            let invDate = moment(inv.date);
            let month = invDate.format('MMM');

            if (monthlyValues.hasOwnProperty(month)) {
                monthlyValues[month] += inv.quantity * inv.price;
            }
        });
        return monthlyValues;
    };

    export const currentYearPerformanceTrend = (listOfInvestment:InvestmentModel[]) => {
        const startOfYear = moment().startOf('year');
        const now = moment();

        let startValue = 0;
        let currentValue = 0;

        listOfInvestment.forEach((inv:InvestmentModel) => {
            const invDate = moment(inv.date);
            const value = inv.quantity * inv.price;
            // Value for start of year (include only those before or on Jan 1st)
            if (invDate.isSameOrBefore(startOfYear)) {
            startValue += value;
            }

            // Value as of today
            if (invDate.isSameOrBefore(now)) {
            currentValue += value;
            }
        });

        const ytdReturn = (currentValue / 100);
        return parseFloat(ytdReturn.toFixed(2));
    };