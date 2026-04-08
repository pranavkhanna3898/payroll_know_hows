import React from 'react';

export default function Step1_Salary({ state }) {
  const {
    ctc, daysInMonth, lopDays, overtimeHours, otRate, arrears,
    updateData, basic, hra, special, overtimePay, grossSalary
  } = state;

  return (
    <div className="sim-card sim-card-blue">
      <div className="sim-card-header">
        <h3>Step 1: Attendance & Gross Salary</h3>
        <p>Convert CTC to monthly gross based on attendance and variable inputs.</p>
      </div>

      <div className="sim-card-body">
        <div className="sim-input-grid">
          <div className="sim-input-group">
            <label>Annual CTC (₹)</label>
            <input type="number" value={ctc} onChange={(e) => updateData('ctc', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Days in Month</label>
            <input type="number" value={daysInMonth} onChange={(e) => updateData('daysInMonth', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>LOP (Loss of Pay) Days</label>
            <input type="number" value={lopDays} onChange={(e) => updateData('lopDays', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Overtime Hours</label>
            <input type="number" value={overtimeHours} onChange={(e) => updateData('overtimeHours', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>OT Rate/Hr (₹)</label>
            <input type="number" value={otRate} onChange={(e) => updateData('otRate', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Arrears (₹)</label>
            <input type="number" value={arrears} onChange={(e) => updateData('arrears', e.target.value)} />
          </div>
        </div>

        <div className="sim-output-box">
          <h4>Computed Gross Breakdown</h4>
          <div className="sim-line-item">
            <span>Basic (Prorated):</span>
            <span>₹ {basic.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>HRA (Prorated):</span>
            <span>₹ {hra.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>Special Allowance (Prorated):</span>
            <span>₹ {special.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>Overtime Component:</span>
            <span>+ ₹ {overtimePay.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>Arrears:</span>
            <span>+ ₹ {arrears.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item sim-total">
            <span>Gross Salary:</span>
            <span>₹ {grossSalary.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
