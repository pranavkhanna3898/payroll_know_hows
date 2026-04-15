import { useState } from 'react';

const fmt = v => Math.round(v || 0).toLocaleString('en-IN');

function TaxCard({ emp, activePayrun, updateTaxOverride }) {
  const [expanded, setExpanded] = useState(false);
  const { computed: c, id } = emp;
  const ov = activePayrun?.taxOverrides?.[id] || {};

  const field = (key, empKey) => ov[key] ?? emp[empKey ?? key];

  const update = (key, val) => updateTaxOverride(id, key, val);

  return (
    <div className="sim-card" style={{ marginBottom: 16, overflow: 'hidden' }}>
      {/* Collapsed row */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpanded(e => !e)}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{emp.name}</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>{emp.empCode} · {emp.department}</div>
          </div>
          <span style={{ background: emp.taxRegime === 'new' ? '#d1fae5' : '#fef3c7', color: emp.taxRegime === 'new' ? '#065f46' : '#b45309', padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
            {field('taxRegime') === 'new' ? 'New Regime' : 'Old Regime'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Annual Tax</div>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a' }}>₹{fmt(c.annualTax)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Monthly TDS</div>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: '#dc2626' }}>₹{fmt(c.tds)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Taxable Income</div>
            <div style={{ fontFamily: 'monospace', fontWeight: 600, color: '#7c3aed' }}>₹{fmt(c.taxableIncome)}</div>
          </div>
          <span style={{ fontSize: 18, color: '#94a3b8' }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid #e2e8f0' }}>
          {/* IT Declaration Inputs */}
          <div style={{ padding: 20, background: '#fafafa', borderBottom: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: 14, letterSpacing: 0.4 }}>📋 IT Declaration &amp; Deductions</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
              {/* Tax Regime */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Tax Regime</div>
                <select value={field('taxRegime')} onChange={e => update('taxRegime', e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
                  <option value="new">New Regime (FY26-27)</option>
                  <option value="old">Old Regime</option>
                </select>
              </div>
              {/* Investments */}
              {[
                ['Sec 80C Investments (₹)', 'investments80C', field('taxRegime') !== 'old'],
                ['Sec 80D Medical Premium (₹)', 'medical80D', field('taxRegime') !== 'old'],
                ['Monthly Rent Paid (₹)', 'monthlyRentPaid', field('taxRegime') !== 'old'],
              ].map(([label, key, disabled]) => (
                <div key={key}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                  <input type="number" value={field(key)} onChange={e => update(key, Number(e.target.value))} disabled={disabled}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', background: disabled ? '#f1f5f9' : 'white', opacity: disabled ? 0.5 : 1 }} />
                </div>
              ))}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>City Type (HRA)</div>
                <select value={String(field('isMetro', 'isMetro'))} onChange={e => update('isMetro', e.target.value === 'true')} disabled={field('taxRegime') !== 'old'}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', opacity: field('taxRegime') !== 'old' ? 0.5 : 1 }}>
                  <option value="true">Metro (50% Basic)</option>
                  <option value="false">Non-Metro (40% Basic)</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>TDS Deducted YTD (₹)</div>
                <input type="number" value={field('tdsDeductedSoFar')} onChange={e => update('tdsDeductedSoFar', Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>Remaining Months in FY</div>
                <input type="number" min="1" value={field('monthsRemaining')} onChange={e => update('monthsRemaining', Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }} />
              </div>
            </div>
          </div>

          {/* Tax Computation Trace */}
          <div style={{ padding: 20 }}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: 14, letterSpacing: 0.4 }}>🔬 Tax Computation Trace</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* Annualization */}
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', fontSize: 12 }}>
                <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>① Annualization of Gross</div>
                <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
                  Standard Monthly × 11 + Current Month Gross<br/>
                  <span style={{ color: '#1e40af', fontWeight: 700 }}>= ₹{fmt(c.annualGross - c.grossSalary)} + ₹{fmt(c.grossSalary)} = ₹{fmt(c.annualGross)}</span>
                </div>
              </div>
              {/* Deductions / Taxable */}
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '12px 14px', fontSize: 12 }}>
                <div style={{ fontWeight: 700, color: '#475569', marginBottom: 6 }}>② Taxable Income</div>
                <div style={{ fontFamily: 'monospace', color: '#64748b', lineHeight: 1.7 }}>
                  {field('taxRegime') === 'new' ? 'After ₹75,000 Standard Deduction' : 'After 80C/80D/HRA Deductions'}<br/>
                  <span style={{ color: '#7c3aed', fontWeight: 700 }}>= ₹{fmt(c.taxableIncome)}</span>
                </div>
              </div>
              {/* Slab computation */}
              <div style={{ background: '#fef3c7', borderRadius: 8, padding: '12px 14px', fontSize: 12, gridColumn: '1 / -1' }}>
                <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 6 }}>③ Tax Slab &amp; Annual Tax</div>
                <div style={{ fontFamily: 'monospace', color: '#78350f', lineHeight: 1.7 }}>
                  {c.taxFormulaDetail}<br/>
                  <span style={{ fontWeight: 700 }}>Annual Tax = ₹{fmt(c.annualTax)}</span>
                </div>
              </div>
              {/* TDS Recovery */}
              <div style={{ background: '#1e293b', borderRadius: 8, padding: '12px 14px', fontSize: 12, gridColumn: '1 / -1' }}>
                <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: 4 }}>④ Monthly TDS Recovery</div>
                <div style={{ fontFamily: 'monospace', color: '#7dd3fc', lineHeight: 1.7 }}>
                  (₹{fmt(c.annualTax)} − ₹{fmt(field('tdsDeductedSoFar'))}) ÷ {field('monthsRemaining')} months
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginTop: 6 }}>= ₹{fmt(c.tds)} / month</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PayrollOps_Tax({ payrunEmployees, activePayrun, updateTaxOverride, onNext, onBack }) {
  const totalTax = payrunEmployees.reduce((s, e) => s + (e.computed.annualTax || 0), 0);
  const totalTDS = payrunEmployees.reduce((s, e) => s + (e.computed.tds || 0), 0);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Summary Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Employees', value: payrunEmployees.length, color: '#2563eb', unit: '' },
          { label: 'Aggregate Annual Tax', value: fmt(totalTax), color: '#dc2626', unit: '₹' },
          { label: 'Total TDS This Month', value: fmt(totalTDS), color: '#b45309', unit: '₹' },
        ].map(item => (
          <div key={item.label} className="sim-card" style={{ padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.unit}{item.value}</div>
          </div>
        ))}
      </div>

      {/* Per-employee Tax Cards */}
      {payrunEmployees.map(emp => (
        <TaxCard key={emp.id} emp={emp} activePayrun={activePayrun} updateTaxOverride={updateTaxOverride} />
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <button onClick={onBack} style={{ padding: '10px 20px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>← Back</button>
        <button onClick={onNext} style={{ padding: '10px 24px', background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>Confirm &amp; Export →</button>
      </div>
    </div>
  );
}
