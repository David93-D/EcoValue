import { IBalance } from "./i-balance";
import { ICashFlow } from "./i-cash-flow";
import { IIncome } from "./i-income";

export interface IFundamentales {
    balance_sheet: IBalance, 
    income_statement: IIncome, 
    cash_flow_statement: ICashFlow,
    fiscal_year: string
}
