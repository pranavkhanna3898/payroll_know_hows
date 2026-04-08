import React from 'react';

export default function Step2_Tax({ state }) {
  const {
    investments80C, medical80D, hraExempt, tdsDeductedSoFar, monthsRemaining,
    updateData, grossSalary, taxableIncome, annualTax, tds
  } = state;

  return (
    <div className="sim-card sim-card-purple">
      <div className="sim-card-header">
        <h3>Step 2: Investment Declarations & TDS</h3>
        <p>Determine the income tax liability on the gross salary factoring in Section 10 and Chapter VI-A exemptions.</p>
      </div>

      <div className="sim-card-body">
         <div className="sim-badge" style={{marginBottom: 16}}>
          <span>Inputs From Step 1:</span> Current Gross = ₹{grossSalary.toLocaleString(undefined, {maximumFractionDigits: 2})}
        </div>

        <div className="sim-input-grid">
          <div className="sim-input-group">
            <label>80C Investments (Max 1.5L)</label>
            <input type="number" value={investments80C} onChange={(e) => updateData('investments80C', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>80D Medical Premium</label>
            <input type="number" value={medical80D} onChange={(e) => updateData('medical80D', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Exempt HRA (Sec 10)</label>
            <input type="number" value={hraExempt} onChange={(e) => updateData('hraExempt', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>TDS Deducted So Far (YTD)</label>
            <input type="number" value={tdsDeductedSoFar} onChange={(e) => updateData('tdsDeductedSoFar', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Remaining Months in FY</label>
            <input type="number" value={monthsRemaining} min="1" onChange={(e) => updateData('monthsRemaining', e.target.value)} />
          </div>
        </div>

        <div className="sim-output-box">
          <h4>Tax Projection Breakdown</h4>
          <div className="sim-line-item">
            <span>Projected Net Taxable Income:</span>
            <span>₹ {taxableIncome.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>Total Projected Annual Tax:</span>
            <span>₹ {annualTax.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item sim-total">
            <span>Monthly TDS Recovery:</span>
            <span>- ₹ {tds.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
