import React from 'react';

export default function Step3_NetPay({ state }) {
  const {
    grossSalary, basic, tds, pfEmployee, esiEmployee, pt, lwf,
    totalDeductions, netPay, employeeDeductions, monthlyReimbursements,
    reimbursementTaxStrategy, standardBasic, selectedState
  } = state;

  const fmt = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="sim-card sim-card-green">
      <div className="sim-card-header">
        <h3>Step 3: Actual Payable Salary (Net Pay)</h3>
        <p>Complete deduction trace from Gross to final In-Hand salary.</p>
      </div>

      <div className="sim-card-body">
        {/* Inputs summary */}
        <div className="sim-badge" style={{ marginBottom: 16 }}>
          <span>From Steps 1 &amp; 2:</span>&nbsp;
          Gross = ₹{fmt(grossSalary)} | Basic = ₹{fmt(basic)} | TDS = ₹{fmt(tds)}
          {reimbursementTaxStrategy === 'year_end' && monthlyReimbursements > 0 && (
            <span style={{ color: '#15803d', marginLeft: 8 }}>| Reims (Exempt, paid to bank) = ₹{fmt(monthlyReimbursements)}</span>
          )}
        </div>

        <div className="sim-output-box">
          <h4>Calculation Breakup: Deductions &amp; Net Pay</h4>

          {/* ① EPF */}
          <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 14px', marginBottom: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>① EPF — Employee Share (12% of Basic)</div>
            <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
              = MIN(₹1,800, ₹{fmt(standardBasic)} × 12%) or prorated formula<br/>
              <span style={{ color: '#dc2626', fontWeight: 700 }}>= − ₹{fmt(pfEmployee)}</span>
            </div>
          </div>

          {/* ② ESIC */}
          <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 14px', marginBottom: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>② ESIC — Employee Share (0.75% of Gross if Gross ≤ ₹21,000)</div>
            <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
              {grossSalary <= 21000
                ? <>= ₹{fmt(grossSalary)} × 0.75%<br/><span style={{ color: '#dc2626', fontWeight: 700 }}>= − ₹{fmt(esiEmployee)}</span></>
                : <span style={{ color: '#16a34a', fontWeight: 700 }}>Not applicable — Gross exceeds ₹21,000 threshold → ₹0</span>
              }
            </div>
          </div>

          {/* ③ PT */}
          <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 14px', marginBottom: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>③ Professional Tax — State: {selectedState}</div>
            <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
              {pt > 0
                ? <><span>= State slab lookup on Gross ₹{fmt(grossSalary)}</span><br/><span style={{ color: '#dc2626', fontWeight: 700 }}>= − ₹{fmt(pt)}</span></>
                : <span style={{ color: '#16a34a', fontWeight: 700 }}>Not applicable for state {selectedState} at Gross ₹{fmt(grossSalary)} → ₹0</span>
              }
            </div>
          </div>

          {/* ④ LWF */}
          <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 14px', marginBottom: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>④ Labour Welfare Fund — State: {selectedState}</div>
            <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
              {lwf > 0
                ? <><span>= Fixed state contribution per LWF Act</span><br/><span style={{ color: '#dc2626', fontWeight: 700 }}>= − ₹{fmt(lwf)}</span></>
                : <span style={{ color: '#16a34a', fontWeight: 700 }}>Not applicable for state {selectedState} → ₹0</span>
              }
            </div>
          </div>

          {/* ⑤ TDS */}
          <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 14px', marginBottom: 10, fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>⑤ TDS — From Step 2 computation</div>
            <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
              = (Annual Tax − YTD Deducted) ÷ Remaining Months<br/>
              <span style={{ color: '#dc2626', fontWeight: 700 }}>= − ₹{fmt(tds)}</span>
            </div>
          </div>

          {/* ⑥ Other Deductions */}
          {employeeDeductions > 0 && (
            <div style={{ background: '#f8fafc', borderRadius: 6, padding: '10px 14px', marginBottom: 10, fontSize: 12 }}>
              <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>⑥ Other Policy Deductions (Loans, Canteen, etc.)</div>
              <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
                = Sum of custom employee_deduction components from Step 0<br/>
                <span style={{ color: '#dc2626', fontWeight: 700 }}>= − ₹{fmt(employeeDeductions)}</span>
              </div>
            </div>
          )}

          {/* Deductions Total */}
          <div style={{ borderRadius: 6, border: '1px solid #fecdd3', background: '#fff1f2', padding: '10px 14px', marginBottom: 12, fontSize: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#be123c' }}>
              <span>Total Deductions (① + ② + ③ + ④ + ⑤{employeeDeductions > 0 ? ' + ⑥' : ''})</span>
              <span>− ₹{fmt(totalDeductions)}</span>
            </div>
            <div style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: 11, marginTop: 4 }}>
              ₹{fmt(pfEmployee)} + ₹{fmt(esiEmployee)} + ₹{fmt(pt)} + ₹{fmt(lwf)} + ₹{fmt(tds)}{employeeDeductions > 0 ? ` + ₹${fmt(employeeDeductions)}` : ''}
            </div>
          </div>

          {/* Reimbursement Addition */}
          {reimbursementTaxStrategy === 'year_end' && monthlyReimbursements > 0 && (
            <div style={{ background: '#f0fdf4', borderRadius: 6, padding: '10px 14px', marginBottom: 12, fontSize: 12, border: '1px solid #bbf7d0' }}>
              <div style={{ fontWeight: 700, color: '#166534', marginBottom: 4 }}>+ Reimbursements (Year-End Exempt Strategy)</div>
              <div style={{ fontFamily: 'monospace', color: '#16a34a' }}>
                Paid out tax-free directly to bank. Not part of Gross.<br/>
                <span style={{ fontWeight: 700 }}>+ ₹{fmt(monthlyReimbursements)}</span>
              </div>
            </div>
          )}

          {/* Net Pay Banner */}
          <div className="sim-net-pay-banner">
            <div className="banner-label">Final Net Pay (Take Home)</div>
            <div style={{ fontFamily: 'monospace', color: '#d1fae5', fontSize: 11, marginBottom: 4 }}>
              ₹{fmt(grossSalary)} − ₹{fmt(totalDeductions)}{reimbursementTaxStrategy === 'year_end' && monthlyReimbursements > 0 ? ` + ₹${fmt(monthlyReimbursements)} (Reims)` : ''}
            </div>
            <div className="banner-value">₹ {fmt(netPay)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
