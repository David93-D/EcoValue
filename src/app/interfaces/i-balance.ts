export interface IBalance {
    assets: { value: number },
    noncurrent_assets: { value: number },
    current_assets: { value: number },
    liabilities: { value: number },
    noncurrent_liabilities: { value: number },
    current_liabilities: { value: number },
    equity: { value: number },
    Rdeuda?: { value: number },
    RCalidadDeuda?: { value: number },
    RLiquidez?: { value: number },
    ROE?: { value: number },
    ROA?: { value: number },
    ROCE?: { value: number }
}
