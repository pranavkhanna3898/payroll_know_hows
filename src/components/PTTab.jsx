import { useState } from 'react';
import { STATES } from '../data';
import { PT_DETAILS } from '../data';

const FREQ_COLORS = {
  Monthly:      { bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
  'Half-Yearly':{ bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
  Annual:       { bg: '#ede9fe', color: '#6d28d9', dot: '#8b5cf6' },
  'N/A':        { bg: '#f1f5f9', color: '#94a3b8', dot: '#94a3b8' },
};

function getFreqKey(freq) {
  if (!freq || freq === 'N/A') return 'N/A';
  if (freq.toLowerCase().startsWith('half')) return 'Half-Yearly';
  if (freq.toLowerCase().startsWith('annual')) return 'Annual';
  return 'Monthly';
}

export default function PTTab() {
  const [filter, setFilter] = useState('all');

  const applicable = STATES.filter(st => {
    const pt = PT_DETAILS[st.code];
    return pt && pt.freq !== 'N/A';
  });
  const notApplicable = STATES.filter(st => {
    const pt = PT_DETAILS[st.code];
    return !pt || pt.freq === 'N/A';
  });

  const displayStates = filter === 'applicable' ? applicable
    : filter === 'none' ? notApplicable
    : STATES;

  const freqBreakdown = applicable.reduce((acc, st) => {
    const key = getFreqKey(PT_DETAILS[st.code]?.freq);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 className="tab-heading">Professional Tax — State-wise Slabs</h2>
        <p className="tab-subheading">
          Governed by state Professional Tax Acts. Maximum ₹2,500/year. Deductible u/s 16(iii) of Income Tax Act.
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ background: '#dbeafe', borderRadius: 8, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#1e40af' }}>{applicable.length}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase' }}>PT Applicable</span>
        </div>
        <div style={{ background: '#f1f5f9', borderRadius: 8, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#475569' }}>{notApplicable.length}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Exempt States</span>
        </div>
        {Object.entries(freqBreakdown).map(([key, count]) => (
          <div key={key} style={{ background: FREQ_COLORS[key]?.bg || '#f1f5f9', borderRadius: 8, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: FREQ_COLORS[key]?.color || '#64748b' }}>{count}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: FREQ_COLORS[key]?.color || '#94a3b8', textTransform: 'uppercase' }}>{key}</span>
          </div>
        ))}
        <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#15803d' }}>₹2,500</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', textTransform: 'uppercase' }}>Max / Year</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['all', 'All States'], ['applicable', 'PT Applicable'], ['none', 'Exempt / No PT']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid',
              fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
              background: filter === key ? '#1e40af' : '#fff',
              color: filter === key ? '#fff' : '#475569',
              borderColor: filter === key ? '#1e40af' : '#cbd5e1',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="card-grid">
        {displayStates.map((st) => {
          const pt = PT_DETAILS[st.code];
          const hasPT = pt && pt.freq !== 'N/A';
          const freqKey = getFreqKey(pt?.freq);
          const freqStyle = FREQ_COLORS[freqKey] || FREQ_COLORS['N/A'];

          return (
            <div
              key={st.code}
              className="state-card"
              style={{
                border: hasPT ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                borderLeft: `4px solid ${hasPT ? '#1e40af' : '#cbd5e1'}`,
              }}
            >
              {/* Card Header */}
              <div className="state-card-header">
                <div>
                  <div className="state-card-name">{st.name}</div>
                  <div className="state-card-code">{st.code}</div>
                </div>
                <div
                  className="state-card-badge"
                  style={{ background: hasPT ? '#dbeafe' : '#f1f5f9', color: hasPT ? '#1e40af' : '#9ca3af' }}
                >
                  {hasPT ? '✓ PT Applicable' : '✕ No PT'}
                </div>
              </div>

              {hasPT ? (
                <div className="state-card-details" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Frequency Badge */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: freqStyle.bg, color: freqStyle.color,
                      borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: freqStyle.dot, display: 'inline-block' }} />
                      {pt.freq}
                    </span>
                  </div>

                  {/* Slab Table */}
                  <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', background: '#f8fafc', padding: '5px 10px', fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      <span>Income Range</span>
                      <span style={{ textAlign: 'right' }}>PT Amount</span>
                    </div>
                    {pt.slabs.map((slab, i) => (
                      <div key={i} style={{
                        display: 'grid', gridTemplateColumns: '1fr auto',
                        padding: '6px 10px', fontSize: 12,
                        background: i % 2 === 0 ? '#fff' : '#fafafa',
                        borderTop: '1px solid #f1f5f9',
                      }}>
                        <span style={{ color: '#475569' }}>{slab.range}</span>
                        <span style={{
                          fontWeight: 700, textAlign: 'right',
                          color: slab.amount === 'Nil' ? '#16a34a' : '#1e40af',
                        }}>{slab.amount}</span>
                      </div>
                    ))}
                  </div>

                  {/* Governing Act */}
                  {pt.act && pt.act !== 'Not Applicable' && (
                    <div style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.4, borderTop: '1px dashed #e2e8f0', paddingTop: 8 }}>
                      📜 {pt.act}
                    </div>
                  )}
                </div>
              ) : (
                <div className="state-card-empty">
                  No Professional Tax legislation in this state/UT.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
