export interface IBalance {
    assets: { value: number },
    noncurrent_assets: { value: number },
    current_assets: { value: number },
    liabilities: { value: number },
    noncurrent_liabilities: { value: number },
    current_liabilities: { value: number },
    equity: { value: number }
}
