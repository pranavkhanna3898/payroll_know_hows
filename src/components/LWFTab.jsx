import { useState } from 'react';
import { STATES } from '../data';
import { LWF_DETAILS } from '../data';

const FREQ_COLORS = {
  Monthly:             { bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
  'Semi-Annual':       { bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' },
  Annual:              { bg: '#ede9fe', color: '#6d28d9', dot: '#8b5cf6' },
  'N/A':               { bg: '#f1f5f9', color: '#94a3b8', dot: '#94a3b8' },
};

function getFreqKey(freq) {
  if (!freq || freq === 'N/A') return 'N/A';
  if (freq.toLowerCase().includes('semi') || freq.toLowerCase().includes('half')) return 'Semi-Annual';
  if (freq.toLowerCase().startsWith('annual')) return 'Annual';
  return 'Monthly';
}

export default function LWFTab() {
  const [filter, setFilter] = useState('all');

  const applicable = STATES.filter(st => {
    const lwf = LWF_DETAILS[st.code];
    return lwf && lwf.freq !== 'N/A';
  });
  const notApplicable = STATES.filter(st => {
    const lwf = LWF_DETAILS[st.code];
    return !lwf || lwf.freq === 'N/A';
  });

  const displayStates = filter === 'applicable' ? applicable
    : filter === 'none' ? notApplicable
    : STATES;

  const freqBreakdown = applicable.reduce((acc, st) => {
    const key = getFreqKey(LWF_DETAILS[st.code]?.freq);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 className="tab-heading">Labour Welfare Fund — State-wise Details</h2>
        <p className="tab-subheading">
          Governed by state LWF Acts. Nominal amounts; mandatory where applicable. Both employee and employer contribute.
        </p>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ background: '#d1fae5', borderRadius: 8, padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#065f46' }}>{applicable.length}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#059669', textTransform: 'uppercase' }}>LWF Applicable</span>
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
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['all', 'All States'], ['applicable', 'LWF Applicable'], ['none', 'Exempt / No LWF']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: '1px solid',
              fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
              background: filter === key ? '#059669' : '#fff',
              color: filter === key ? '#fff' : '#475569',
              borderColor: filter === key ? '#059669' : '#cbd5e1',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="card-grid">
        {displayStates.map((st) => {
          const lwf = LWF_DETAILS[st.code];
          const hasLWF = lwf && lwf.freq !== 'N/A';
          const freqKey = getFreqKey(lwf?.freq);
          const freqStyle = FREQ_COLORS[freqKey] || FREQ_COLORS['N/A'];

          return (
            <div
              key={st.code}
              className="state-card"
              style={{
                border: hasLWF ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                borderLeft: `4px solid ${hasLWF ? '#059669' : '#cbd5e1'}`,
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
                  style={{ background: hasLWF ? '#d1fae5' : '#f1f5f9', color: hasLWF ? '#059669' : '#9ca3af' }}
                >
                  {hasLWF ? '✓ LWF Applicable' : '✕ No LWF'}
                </div>
              </div>

              {hasLWF ? (
                <div className="state-card-details" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Frequency Badge */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: freqStyle.bg, color: freqStyle.color,
                      borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: freqStyle.dot, display: 'inline-block' }} />
                      {lwf.freq}
                    </span>
                  </div>

                  {/* Contribution Table */}
                  <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {/* Column headers */}
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 60px 60px 60px',
                      background: '#f8fafc', padding: '5px 10px',
                      fontSize: 10, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5,
                    }}>
                      <span>Category</span>
                      <span style={{ textAlign: 'center' }}>EE</span>
                      <span style={{ textAlign: 'center' }}>ER</span>
                      <span style={{ textAlign: 'center' }}>Total</span>
                    </div>
                    {lwf.slabs.map((slab, i) => (
                      <div key={i} style={{
                        borderTop: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#fff' : '#fafafa',
                      }}>
                        <div style={{ padding: '4px 10px', fontSize: 11, color: '#64748b' }}>{slab.range}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px 60px', padding: '4px 10px 8px', fontSize: 12 }}>
                          <span />
                          <span style={{ textAlign: 'center', fontWeight: 700, color: '#059669' }}>{slab.emp}</span>
                          <span style={{ textAlign: 'center', fontWeight: 700, color: '#7c3aed' }}>{slab.er}</span>
                          <span style={{ textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>{slab.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#94a3b8' }}>
                    <span>🟢 EE = Employee</span>
                    <span>🟣 ER = Employer</span>
                    <span>⬛ Total = Combined</span>
                  </div>

                  {/* Governing Act */}
                  {lwf.act && lwf.act !== 'Not Applicable' && (
                    <div style={{ fontSize: 10, color: '#94a3b8', lineHeight: 1.4, borderTop: '1px dashed #e2e8f0', paddingTop: 8 }}>
                      📜 {lwf.act}
                    </div>
                  )}
                </div>
              ) : (
                <div className="state-card-empty">
                  No Labour Welfare Fund Act applicable in this state/UT.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
