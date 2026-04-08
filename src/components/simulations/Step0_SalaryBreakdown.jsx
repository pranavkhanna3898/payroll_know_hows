import React from 'react';

export default function Step0_SalaryBreakdown({ state }) {
  const { monthlyBasic, monthlyHRA, monthlySpecial, updateData } = state;
  const total = monthlyBasic + monthlyHRA + monthlySpecial;

  return (
    <div className="sim-card sim-card-blue">
      <div className="sim-card-header">
        <h3>Step 0: Salary Structure Definition</h3>
        <p>Input the employee's standard monthly fixed component breakdown.</p>
      </div>

      <div className="sim-card-body">
        <div className="sim-input-grid">
          <div className="sim-input-group">
            <label>Monthly Basic (₹)</label>
            <input type="number" value={monthlyBasic} onChange={(e) => updateData('monthlyBasic', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Monthly HRA (₹)</label>
            <input type="number" value={monthlyHRA} onChange={(e) => updateData('monthlyHRA', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Monthly Special Allowance (₹)</label>
            <input type="number" value={monthlySpecial} onChange={(e) => updateData('monthlySpecial', e.target.value)} />
          </div>
        </div>

        <div className="sim-output-box">
          <h4>Calculation: Standard Input CTC</h4>
          <div className="code-content" style={{background: 'transparent', padding: '0 0 10px', color: '#475569', fontSize: 12}}>
            Total Monthly Base = (Basic + HRA + Special)
          </div>
          <div className="sim-line-item">
            <span>₹ {monthlyBasic.toLocaleString()} + ₹ {monthlyHRA.toLocaleString()} + ₹ {monthlySpecial.toLocaleString()}</span>
            <span style={{fontWeight: 700}}>Total: ₹ {total.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item sim-total">
            <span>Implied Annual Basic CTC:</span>
            <span>₹ {(total * 12).toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
