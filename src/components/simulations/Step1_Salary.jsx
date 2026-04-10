import React from 'react';

export default function Step1_Salary({ state }) {
  const {
    daysInMonth, lopDays, overtimeHours, otRate, leaveEncashmentDays, arrearEntries,
    updateData, standardBasic, standardHRA, standardSpecial, salaryComponents, updateComponent, addArrearEntry, updateArrearEntry, removeArrearEntry,
    basic, hra, special, overtimePay, arrearsPay, leaveEncashmentPay, variablePay, grossSalary, attendanceFactor
  } = state;

  const variableComps = salaryComponents.filter(c => c.type === 'variable');
  const standardGross = standardBasic + standardHRA + standardSpecial;

  return (
    <div className="sim-card sim-card-blue">
      <div className="sim-card-header">
        <h3>Step 1: Attendance & Gross Salary</h3>
        <p>Convert CTC to monthly gross based on attendance and variable inputs.</p>
      </div>

      <div className="sim-card-body">
        <div className="sim-input-grid">
          <div className="sim-input-group">
            <label className="has-tooltip" data-tooltip="Total of all fixed standard components. Unprorated.">Base Monthly Gross (Step 0) <span className="tooltip-icon">?</span></label>
            <input type="number" value={standardGross} disabled style={{background: '#f1f5f9'}} />
          </div>
          <div className="sim-input-group">
            <label className="has-tooltip" data-tooltip="Total calendar days for the execution month.">Days in Month <span className="tooltip-icon">?</span></label>
            <input type="number" value={daysInMonth} onChange={(e) => updateData('daysInMonth', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label className="has-tooltip" data-tooltip="Unpaid leaves. Directly reduces the standard attendance factor.">LOP (Loss of Pay) Days <span className="tooltip-icon">?</span></label>
            <input type="number" value={lopDays} onChange={(e) => updateData('lopDays', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label className="has-tooltip" data-tooltip="Count of statutory OT hours to be paid.">Overtime Hours <span className="tooltip-icon">?</span></label>
            <input type="number" value={overtimeHours} onChange={(e) => updateData('overtimeHours', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label className="has-tooltip" data-tooltip="Hourly multiplier for Overtime standard formula.">OT Rate/Hr (₹) <span className="tooltip-icon">?</span></label>
            <input type="number" value={otRate} onChange={(e) => updateData('otRate', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label className="has-tooltip" data-tooltip="Divided against Base Monthly Gross / 26 days.">Leave Encashment (Days) <span className="tooltip-icon">?</span></label>
            <input type="number" value={leaveEncashmentDays} onChange={(e) => updateData('leaveEncashmentDays', e.target.value)} />
          </div>
        </div>

        {variableComps.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h4 style={{ fontSize: 13, marginBottom: 8, color: '#475569', borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>Variable Payouts (Current Month)</h4>
            <div className="sim-input-grid">
              {variableComps.map(comp => (
                <div key={comp.id} className="sim-input-group">
                  <label className="has-tooltip" data-tooltip={`Annual/Fixed target is ₹${comp.amount}`}>{comp.name} Target: ₹{comp.amount} <span className="tooltip-icon">?</span></label>
                  <input 
                    type="number" 
                    value={comp.currentPayout || ''} 
                    onChange={(e) => updateComponent(comp.id, 'currentPayout', e.target.value)} 
                    placeholder="Enter manual payout"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderBottom: '1px solid #e2e8f0', paddingBottom: 4 }}>
            <h4 style={{ fontSize: 13, color: '#475569', margin: 0 }}>Arrears Data</h4>
            <button onClick={addArrearEntry} style={{ background: '#e2e8f0', border: 'none', padding: '4px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>+ Add Month</button>
          </div>
          {arrearEntries.length === 0 ? (
            <p style={{ fontSize: 12, color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>No arrears applied.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {arrearEntries.map(entry => (
                <div key={entry.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                  <div className="sim-input-group" style={{ flex: 1.5, margin: 0 }}>
                     <label className="has-tooltip" data-tooltip="The exact historical month where the shortage occurred." style={{marginBottom: 4}}>Historical Month Baseline <span className="tooltip-icon">?</span></label>
                     <select 
                       value={entry.monthName || 'January'} 
                       onChange={(e) => {
                         const val = e.target.value;
                         const daysMap = {
                           'January': 31, 'February (Regular)': 28, 'February (Leap)': 29, 'March': 31,
                           'April': 30, 'May': 31, 'June': 30, 'July': 31, 'August': 31,
                           'September': 30, 'October': 31, 'November': 30, 'December': 31
                         };
                         updateArrearEntry(entry.id, 'monthName', val);
                         // Small hack to ensure monthDays updates simultaneously without modifying simState signature
                         setTimeout(() => updateArrearEntry(entry.id, 'monthDays', daysMap[val] || 30), 0);
                       }} 
                       style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: 6, background: '#fff', fontSize: 13, width: '100%' }}>
                       {['January', 'February (Regular)', 'February (Leap)', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                         <option key={m} value={m}>{m}</option>
                       ))}
                     </select>
                  </div>
                  <div className="sim-input-group" style={{ flex: 1, margin: 0 }}>
                     <label className="has-tooltip" data-tooltip="The Base CTC in effect during that specific time frame, overriding recent appraisals." style={{marginBottom: 4}}>Historical Gross <span className="tooltip-icon">?</span></label>
                     <input 
                       type="number" 
                       placeholder={`Current: ${standardGross}`}
                       value={entry.historicalGross || ''} 
                       onChange={(e) => updateArrearEntry(entry.id, 'historicalGross', e.target.value)} 
                       style={{margin: 0, width: '100%', boxSizing: 'border-box'}} 
                     />
                  </div>
                  <div className="sim-input-group" style={{ flex: 1, margin: 0 }}>
                     <label className="has-tooltip" data-tooltip="Discrete shortage days to be accurately fractioned." style={{marginBottom: 4}}>Payable Arrear Days <span className="tooltip-icon">?</span></label>
                     <input type="number" value={entry.arrearDays} onChange={(e) => updateArrearEntry(entry.id, 'arrearDays', e.target.value)} style={{margin: 0, width: '100%', boxSizing: 'border-box'}} />
                  </div>
                  <button onClick={() => removeArrearEntry(entry.id)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', height: 35, width: 35, borderRadius: 6, cursor: 'pointer' }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sim-output-box" style={{ marginTop: 24 }}>
          <h4>Calculation: Attendance Proration & Gross</h4>
          <div className="code-content" style={{background: 'transparent', padding: '0 0 10px', color: '#475569', fontSize: 12}}>
             Attendance Factor = (Days - LOP) / Days <br/>
             → ({daysInMonth} - {lopDays}) / {daysInMonth} = {attendanceFactor.toFixed(4)} Multiplier
          </div>
          <div className="sim-line-item">
            <span>Basic (Prorated):</span>
            <span>₹ {basic.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>HRA (Prorated):</span>
            <span>₹ {hra.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          <div className="sim-line-item">
            <span>Taxable Allowances:</span>
            <span>₹ {special.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
          {overtimePay > 0 && (
            <div className="sim-line-item">
              <span>Overtime Component:</span>
              <span>+ ₹ {overtimePay.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
            </div>
          )}
          {leaveEncashmentPay > 0 && (
            <div className="sim-line-item">
              <span>Leave Encashment:</span>
              <span>+ ₹ {leaveEncashmentPay.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
            </div>
          )}
          {variablePay > 0 && (
            <div className="sim-line-item">
              <span>Variable Payouts ({variableComps.length}):</span>
              <span>+ ₹ {variablePay.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
            </div>
          )}
          {arrearsPay > 0 && (
            <div className="sim-line-item">
              <span>Arrears Payload:</span>
              <span>+ ₹ {arrearsPay.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
            </div>
          )}
          <div className="sim-line-item sim-total" style={{marginTop: 8}}>
            <span>Total Imputed Gross Salary:</span>
            <span>₹ {grossSalary.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
