import React, { useState } from 'react';
import { STATES, STATUS, CATEGORIES, PT_DETAILS, LWF_DETAILS } from '../data';

function countByStatus(comp) {
  const counts = { M: 0, V: 0, O: 0, N: 0, C: 0 };
  Object.values(comp.states).forEach((s) => {
    if (counts[s] !== undefined) counts[s]++;
  });
  return counts;
}

export default function DetailTab({ selectedComponent, onComponentSelect, onBack }) {
  const [regime, setRegime] = useState('new');

  if (!selectedComponent) {
    return (
      <div>
        <h2 className="tab-heading">Component Detail View</h2>
        <p className="tab-subheading" style={{ marginBottom: 20 }}>
          Select a component from the matrix or click below to view full details.
        </p>
        <div className="component-card-grid">
          {CATEGORIES.map((cat) =>
            cat.components.map((comp) => (
              <div
                key={comp.id}
                onClick={() =>
                  onComponentSelect({ ...comp, categoryName: cat.name, categoryColor: cat.color })
                }
                className="component-card"
                style={{ borderLeft: `4px solid ${cat.color}` }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div className="comp-name">{comp.name}</div>
                <div className="comp-category" style={{ marginBottom: 8 }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>
                  {comp[`taxNote${regime === 'new' ? 'New' : 'Old'}`] || comp.taxNote}
                </div>
                <div className="status-badges">
                  {(() => {
                    const counts = countByStatus(comp);
                    return Object.entries(counts)
                      .filter(([, v]) => v > 0)
                      .map(([k, v]) => (
                        <span
                          key={k}
                          className="status-badge"
                          style={{ background: STATUS[k].bg, color: STATUS[k].color }}
                        >
                          {STATUS[k].symbol} {v}
                        </span>
                      ));
                  })()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} className="back-button">← Back to All Components</button>
        <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
          <button 
            onClick={() => setRegime('new')}
            style={{ padding: '6px 12px', fontSize: 13, fontWeight: 500, borderRadius: '6px', background: regime === 'new' ? '#fff' : 'transparent', border: 'none', boxShadow: regime === 'new' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', color: regime === 'new' ? '#0f172a' : '#64748b', cursor: 'pointer' }}>
            New Regime
          </button>
          <button 
            onClick={() => setRegime('old')}
            style={{ padding: '6px 12px', fontSize: 13, fontWeight: 500, borderRadius: '6px', background: regime === 'old' ? '#fff' : 'transparent', border: 'none', boxShadow: regime === 'old' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', color: regime === 'old' ? '#0f172a' : '#64748b', cursor: 'pointer' }}>
            Old Regime
          </button>
        </div>
      </div>
      <div className="detail-panel">
        <div
          className="detail-panel-header"
          style={{
            background: `linear-gradient(135deg, ${selectedComponent.categoryColor}22, ${selectedComponent.categoryColor}10)`,
            borderBottom: `3px solid ${selectedComponent.categoryColor}`,
          }}
        >
          <div
            className="detail-panel-category"
            style={{ color: selectedComponent.categoryColor }}
          >
            {selectedComponent.categoryName}
          </div>
          <h2 className="detail-panel-title">{selectedComponent.name}</h2>
          <div className="detail-panel-notes">{selectedComponent.notes}</div>
        </div>
        <div className="detail-panel-body">
          <div className="detail-info-card">
            <div className="detail-info-label">📐 Formula / Base</div>
            <div className="detail-info-value">{selectedComponent.base}</div>
            <div className="detail-info-formula">{selectedComponent.formula}</div>
          </div>
          <div className="detail-info-card">
            <div className="detail-info-label">💡 Tax Treatment</div>
            <div style={{ fontSize: 13, color: "#0f172a" }}>
              {selectedComponent[`taxNote${regime === 'new' ? 'New' : 'Old'}`] || selectedComponent.taxNote}
            </div>
          </div>
        </div>

        {selectedComponent.id === 'pt' && (
          <div className="detail-slabs-section" style={{ marginTop: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: '#1e293b', marginBottom: 12 }}>🏛️ State-wise Professional Tax Slabs</h3>
            <div className="slabs-table-container">
              <table className="slabs-table">
                <thead>
                  <tr>
                    <th>State/UT</th>
                    <th>Salary Range</th>
                    <th>PT Amount</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(PT_DETAILS).map(([stCode, data]) => {
                    const stName = STATES.find(s => s.code === stCode)?.name || stCode;
                    if (!data.slabs || data.slabs.length === 0) return null;
                    return data.slabs.map((slab, idx) => (
                      <tr key={`${stCode}-${idx}`}>
                        {idx === 0 && <td rowSpan={data.slabs.length} style={{ fontWeight: 600, verticalAlign: 'top', background: '#fff' }}>{stName}</td>}
                        <td style={{ fontSize: 12 }}>{slab.range}</td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{slab.amount}</td>
                        {idx === 0 && <td rowSpan={data.slabs.length} style={{ verticalAlign: 'top', fontSize: 11, color: '#64748b', background: '#fff' }}>{data.freq}</td>}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(selectedComponent.id === 'lwf_ee' || selectedComponent.id === 'lwf_er') && (
          <div className="detail-slabs-section" style={{ marginTop: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: '#1e293b', marginBottom: 12 }}>⚖️ State-wise LWF Contributions</h3>
            <div className="slabs-table-container">
              <table className="slabs-table">
                <thead>
                  <tr>
                    <th>State/UT</th>
                    <th>Salary Range</th>
                    <th>Employee Share</th>
                    <th>Employer Share</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(LWF_DETAILS).map(([stCode, data]) => {
                    const stName = STATES.find(s => s.code === stCode)?.name || stCode;
                    if (!data.slabs || data.slabs.length === 0) return null;
                    return data.slabs.map((slab, idx) => (
                      <tr key={`${stCode}-${idx}`}>
                        {idx === 0 && <td rowSpan={data.slabs.length} style={{ fontWeight: 600, verticalAlign: 'top', background: '#fff' }}>{stName}</td>}
                        <td style={{ fontSize: 12 }}>{slab.range}</td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{slab.emp}</td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{slab.er}</td>
                        {idx === 0 && <td rowSpan={data.slabs.length} style={{ verticalAlign: 'top', fontSize: 11, color: '#64748b', background: '#fff' }}>{data.freq}</td>}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedComponent.id === 'tds' && (
          <div className="detail-slabs-section" style={{ marginTop: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: '#1e293b', marginBottom: 12 }}>📊 Income Tax Regimes (FY 2026-27)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16 }}>
              <div className="slabs-table-wrapper">
                <div style={{ background: '#f8fafc', padding: '10px 12px', fontWeight: 600, border: '1px solid #e2e8f0', borderBottom: 'none', borderRadius: '6px 6px 0 0', fontSize: 13 }}>New Regime (Default)</div>
                <div className="slabs-table-container" style={{ marginTop: 0 }}>
                  <table className="slabs-table" style={{ border: '1px solid #e2e8f0', margin: 0 }}>
                    <thead>
                      <tr><th>Income Slab</th><th>Tax Rate</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Up to ₹4,00,000</td><td>Nil</td></tr>
                      <tr><td>₹4,00,001 - ₹8,00,000</td><td>5%</td></tr>
                      <tr><td>₹8,00,001 - ₹12,00,000</td><td>10%</td></tr>
                      <tr><td>₹12,00,001 - ₹16,00,000</td><td>15%</td></tr>
                      <tr><td>₹16,00,001 - ₹20,00,000</td><td>20%</td></tr>
                      <tr><td>₹20,00,001 - ₹24,00,000</td><td>25%</td></tr>
                      <tr><td>Above ₹24,00,000</td><td>30%</td></tr>
                      <tr><td colSpan="2" style={{ fontStyle: 'italic', fontSize: '11px' }}>Tax rebate up to ₹12 Lakhs income. Standard Deduction: ₹75,000.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="slabs-table-wrapper">
                <div style={{ background: '#f8fafc', padding: '10px 12px', fontWeight: 600, border: '1px solid #e2e8f0', borderBottom: 'none', borderRadius: '6px 6px 0 0', fontSize: 13 }}>Old Regime</div>
                <div className="slabs-table-container" style={{ marginTop: 0 }}>
                  <table className="slabs-table" style={{ border: '1px solid #e2e8f0', margin: 0 }}>
                    <thead>
                      <tr><th>Income Slab</th><th>Tax Rate</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Up to ₹2,50,000</td><td>Nil</td></tr>
                      <tr><td>₹2,50,001 - ₹5,00,000</td><td>5%</td></tr>
                      <tr><td>₹5,00,001 - ₹10,00,000</td><td>20%</td></tr>
                      <tr><td>Above ₹10,00,000</td><td>30%</td></tr>
                      <tr><td colSpan="2" style={{ fontStyle: 'italic', fontSize: '11px' }}>Exemptions under Ch VI-A available. Standard Deduction: ₹50,000.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="detail-states-section">
          <div className="detail-states-heading">State-wise Applicability</div>
          <div className="detail-states-grid">
            {STATES.map((st) => {
              const statusCode = selectedComponent.states[st.code] || "N";
              const s = STATUS[statusCode];
              return (
                <div
                  key={st.code}
                  className="detail-state-item"
                  style={{
                    background: s.bg + "80",
                    border: `1px solid ${s.color}30`,
                  }}
                >
                  <div
                    className="detail-state-icon"
                    style={{
                      background: s.bg,
                      color: s.color,
                      border: `1px solid ${s.color}40`,
                    }}
                  >
                    {s.symbol}
                  </div>
                  <div>
                    <div className="detail-state-name">{st.name}</div>
                    <div className="detail-state-label" style={{ color: s.color }}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
