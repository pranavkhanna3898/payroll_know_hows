import { useState } from 'react';
import { loadSettings, saveSettings } from '../../data/settingsStore';
import { STATES } from '../../data/states';

const SECTIONS = [
  { id: 'company',    icon: '🏢', label: 'Company Profile' },
  { id: 'statutory',  icon: '📋', label: 'Statutory Compliance' },
  { id: 'cycle',      icon: '🔄', label: 'Payroll Cycle' },
  { id: 'bank',       icon: '🏦', label: 'Bank Integration' },
  { id: 'structure',  icon: '⚙️', label: 'Salary Structure' },
];

const Field = ({ label, children, hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</label>
    {children}
    {hint && <span style={{ fontSize: 10, color: '#94a3b8' }}>{hint}</span>}
  </div>
);

const TextInput = ({ value, onChange, placeholder, disabled }) => (
  <input
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%', background: disabled ? '#f1f5f9' : 'white' }}
  />
);

const Grid = ({ children, cols = 2 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>{children}</div>
);

const SectionCard = ({ title, icon, children }) => (
  <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
    <div style={{ padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{title}</h3>
    </div>
    <div style={{ padding: 20 }}>{children}</div>
  </div>
);

// ── Section: Company Profile ──────────────────────────────────────────────────
function CompanyProfile({ s, update }) {
  return (
    <>
      <SectionCard title="Identity" icon="🪪">
        <Grid cols={3}>
          <Field label="Legal Company Name"><TextInput value={s.companyName} onChange={v => update('companyName', v)} /></Field>
          <Field label="Trade Name (if different)"><TextInput value={s.tradeName} onChange={v => update('tradeName', v)} placeholder="Optional" /></Field>
          <Field label="Industry"><TextInput value={s.industry} onChange={v => update('industry', v)} /></Field>
          <Field label="CIN"><TextInput value={s.cin} onChange={v => update('cin', v)} placeholder="U72900KA2018PTC000000" /></Field>
          <Field label="PAN"><TextInput value={s.pan} onChange={v => update('pan', v)} placeholder="AACCA0000A" /></Field>
          <Field label="TAN"><TextInput value={s.tan} onChange={v => update('tan', v)} placeholder="BLRA00000A" /></Field>
          <Field label="GSTIN"><TextInput value={s.gstin} onChange={v => update('gstin', v)} /></Field>
          <Field label="Incorporation Date"><TextInput value={s.incorporationDate} onChange={v => update('incorporationDate', v)} placeholder="YYYY-MM-DD" /></Field>
          <Field label="Fiscal Year">
            <select value={s.fiscalYear} onChange={e => update('fiscalYear', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
              <option>April–March</option>
              <option>January–December</option>
            </select>
          </Field>
        </Grid>
      </SectionCard>
      <SectionCard title="Address" icon="📍">
        <Grid cols={1}>
          <Field label="Registered Address"><TextInput value={s.regAddress} onChange={v => update('regAddress', v)} /></Field>
          <Field label="Correspondence Address (if different)"><TextInput value={s.corrAddress} onChange={v => update('corrAddress', v)} placeholder="Same as registered" /></Field>
        </Grid>
      </SectionCard>
    </>
  );
}

// ── Section: Statutory ────────────────────────────────────────────────────────
function StatutoryCompliance({ s, update }) {
  return (
    <>
      <SectionCard title="EPFO" icon="💰">
        <Grid cols={3}>
          <Field label="Establishment Code"><TextInput value={s.epfoCode} onChange={v => update('epfoCode', v)} placeholder="ST/CODE/00000" /></Field>
          <Field label="Registration Date"><TextInput value={s.epfoRegDate} onChange={v => update('epfoRegDate', v)} placeholder="YYYY-MM-DD" /></Field>
          <Field label="EPF Calculation Method">
            <select value={s.epfCalculationMethod} onChange={e => update('epfCalculationMethod', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
              <option value="flat_ceiling">Flat Ceiling (Min 12% Basic, Max ₹1,800)</option>
              <option value="actual_basic">Actual Basic × 12%</option>
              <option value="prorated_ceiling">Prorated Ceiling</option>
            </select>
          </Field>
          <Field label="VPF %" hint="Voluntary PF over statutory"><input type="number" min="0" max="100" value={s.vpfPercent} onChange={e => update('vpfPercent', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} /></Field>
          <Field label="Admin Charges %"><input type="number" value={s.adminChargesPercent} onChange={e => update('adminChargesPercent', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} /></Field>
          <Field label="EDLI Charges %"><input type="number" value={s.edliChargesPercent} onChange={e => update('edliChargesPercent', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} /></Field>
        </Grid>
      </SectionCard>
      <SectionCard title="ESIC" icon="🏥">
        <Grid cols={3}>
          <Field label="ESIC Employer Code"><TextInput value={s.esicCode} onChange={v => update('esicCode', v)} /></Field>
          <Field label="Registration Date"><TextInput value={s.esicRegDate} onChange={v => update('esicRegDate', v)} placeholder="YYYY-MM-DD" /></Field>
          <Field label="ESIC Region"><TextInput value={s.esicRegion} onChange={v => update('esicRegion', v)} /></Field>
          <Field label="Wage Ceiling (₹)" hint="Employees below this ceiling are covered"><input type="number" value={s.esicWageCeiling} onChange={e => update('esicWageCeiling', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} /></Field>
        </Grid>
      </SectionCard>
      <SectionCard title="Professional Tax" icon="🏛️">
        {s.ptStateRegistrations.map((reg, i) => (
          <Grid key={i} cols={4}>
            <Field label="State">
              <select value={reg.state} onChange={e => {
                const updated = s.ptStateRegistrations.map((r, ri) => ri === i ? { ...r, state: e.target.value } : r);
                update('ptStateRegistrations', updated);
              }} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
                {STATES.map(st => <option key={st.code} value={st.code}>{st.name}</option>)}
              </select>
            </Field>
            <Field label="Registration No"><TextInput value={reg.regNo} onChange={v => {
              const updated = s.ptStateRegistrations.map((r, ri) => ri === i ? { ...r, regNo: v } : r);
              update('ptStateRegistrations', updated);
            }} /></Field>
            <Field label="Frequency">
              <select value={reg.frequency} onChange={e => {
                const updated = s.ptStateRegistrations.map((r, ri) => ri === i ? { ...r, frequency: e.target.value } : r);
                update('ptStateRegistrations', updated);
              }} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
                <option>Monthly</option><option>Quarterly</option><option>Annual</option>
              </select>
            </Field>
            <Field label=" ">
              <button onClick={() => update('ptStateRegistrations', s.ptStateRegistrations.filter((_, ri) => ri !== i))}
                style={{ padding: '8px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                ✕ Remove
              </button>
            </Field>
          </Grid>
        ))}
        <button onClick={() => update('ptStateRegistrations', [...s.ptStateRegistrations, { state: 'KA', regNo: '', frequency: 'Monthly' }])}
          style={{ marginTop: 12, padding: '6px 14px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
          + Add State
        </button>
      </SectionCard>
      <SectionCard title="Income Tax / TDS" icon="📑">
        <Grid cols={2}>
          <Field label="Default Tax Regime">
            <select value={s.defaultTaxRegime} onChange={e => update('defaultTaxRegime', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
              <option value="new">New Regime (FY 26-27 Default)</option>
              <option value="old">Old Regime</option>
            </select>
          </Field>
          <Field label="Allow Employee Override">
            <select value={String(s.allowEmployeeRegimeOverride)} onChange={e => update('allowEmployeeRegimeOverride', e.target.value === 'true')} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
              <option value="true">Yes — Employee can choose regime</option>
              <option value="false">No — Company default applies</option>
            </select>
          </Field>
        </Grid>
      </SectionCard>
    </>
  );
}

// ── Section: Payroll Cycle ────────────────────────────────────────────────────
function PayrollCycleSettings({ s, update }) {
  return (
    <SectionCard title="Payroll Cycle Configuration" icon="🔄">
      <Grid cols={3}>
        <Field label="Pay Cycle"><TextInput value={s.payCycleType} disabled /></Field>
        <Field label="Pay Period Start (Day)" hint="e.g. 1 for 1st of month">
          <input type="number" min="1" max="31" value={s.payPeriodStart} onChange={e => update('payPeriodStart', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} />
        </Field>
        <Field label="Pay Period End (Day)">
          <input type="number" min="1" max="31" value={s.payPeriodEnd} onChange={e => update('payPeriodEnd', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} />
        </Field>
        <Field label="Attendance Cut-off Date" hint="Last date for attendance inputs">
          <input type="number" min="1" max="31" value={s.attendanceCutoffDate} onChange={e => update('attendanceCutoffDate', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} />
        </Field>
        <Field label="Salary Disbursement Date (next month)">
          <input type="number" min="1" max="10" value={s.disbursementDate} onChange={e => update('disbursementDate', Number(e.target.value))} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none', width: '100%' }} />
        </Field>
        <Field label="LOP Calculation Method">
          <select value={s.lopCalculationMethod} onChange={e => update('lopCalculationMethod', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
            <option value="calendar">Calendar Days</option>
            <option value="working">Working Days</option>
            <option value="pay_period">Pay Period Days</option>
          </select>
        </Field>
        <Field label="Proration Formula">
          <select value={s.prorationType} onChange={e => update('prorationType', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
            <option value="dynamic">Dynamic (Actual days in month)</option>
            <option value="fixed30">Fixed 30 days</option>
          </select>
        </Field>
        <Field label="Auto-lock after Disbursement">
          <select value={String(s.autoLockAfterDisbursement)} onChange={e => update('autoLockAfterDisbursement', e.target.value === 'true')} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Field>
      </Grid>
    </SectionCard>
  );
}

// ── Section: Bank Integration ─────────────────────────────────────────────────
function BankIntegration({ s, update }) {
  return (
    <SectionCard title="Bank & Payment Integration" icon="🏦">
      <Grid cols={3}>
        <Field label="Company Bank"><TextInput value={s.bankName} onChange={v => update('bankName', v)} /></Field>
        <Field label="Account Number"><TextInput value={s.bankAccountNo} onChange={v => update('bankAccountNo', v)} /></Field>
        <Field label="IFSC Code"><TextInput value={s.bankIFSC} onChange={v => update('bankIFSC', v)} /></Field>
        <Field label="Transfer Mode">
          <select value={s.transferMode} onChange={e => update('transferMode', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
            <option>NEFT</option><option>RTGS</option><option>IMPS</option>
          </select>
        </Field>
        <Field label="Bank File Format">
          <select value={s.bankFileFormat} onChange={e => update('bankFileFormat', e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, outline: 'none' }}>
            <option>HDFC</option><option>ICICI</option><option>SBI</option><option>Axis</option><option>Generic CSV</option>
          </select>
        </Field>
        <Field label="Credit Narration Template" hint="Variables: {MONTH}, {YEAR}, {COMPANY}, {EMPCODE}">
          <TextInput value={s.creditNarration} onChange={v => update('creditNarration', v)} placeholder="SALARY {MONTH} {YEAR}" />
        </Field>
      </Grid>
    </SectionCard>
  );
}

// ── Section: Default Salary Structure ─────────────────────────────────────────
function SalaryStructure({ s, update }) {
  const TYPE_LABELS = {
    earnings_basic: 'Basic', earnings_hra: 'HRA', earnings_allowance: 'Allowance',
    variable: 'Variable', reimbursement: 'Reimbursement',
    employer_contrib: 'Employer Contribution', employee_deduction: 'Employee Deduction',
  };
  function addComp() {
    update('defaultSalaryComponents', [
      ...s.defaultSalaryComponents,
      { id: Date.now().toString(), name: 'New Component', type: 'earnings_allowance', amount: 0, matrixId: 'custom', taxSchedule: 'monthly' },
    ]);
  }
  function removeComp(id) {
    update('defaultSalaryComponents', s.defaultSalaryComponents.filter(c => c.id !== id));
  }
  function updateComp(id, field, val) {
    update('defaultSalaryComponents', s.defaultSalaryComponents.map(c => c.id === id ? { ...c, [field]: val } : c));
  }

  return (
    <SectionCard title="Default Salary Structure Template" icon="⚙️">
      <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
        These components will be pre-populated for every new employee. Amounts can be overridden per employee.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              {['Component Name', 'Type', 'Default Amount / Formula', 'Tax Schedule', ''].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 700, color: '#334155', borderBottom: '2px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.defaultSalaryComponents.map(c => (
              <tr key={c.id}>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
                  <input value={c.name} onChange={e => updateComp(c.id, 'name', e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '4px 8px', width: '100%', fontSize: 12 }} />
                </td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
                  <select value={c.type} onChange={e => updateComp(c.id, 'type', e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '4px', fontSize: 12 }}>
                    {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
                  <input value={c.amount} onChange={e => updateComp(c.id, 'amount', e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '4px 8px', width: '100%', fontSize: 12, fontFamily: 'monospace' }} />
                </td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
                  <select value={c.taxSchedule} onChange={e => updateComp(c.id, 'taxSchedule', e.target.value)} style={{ border: '1px solid #e2e8f0', borderRadius: 4, padding: '4px', fontSize: 12 }}>
                    <option value="monthly">Monthly</option>
                    <option value="year_end">Year-End</option>
                  </select>
                </td>
                <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>
                  <button onClick={() => removeComp(c.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addComp} style={{ marginTop: 12, padding: '6px 14px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
        + Add Component
      </button>
    </SectionCard>
  );
}

// ── Main CompanySettingsTab ───────────────────────────────────────────────────
export default function CompanySettingsTab() {
  const [settings, setSettings] = useState(() => loadSettings());
  const [activeSection, setActiveSection] = useState('company');
  const [saved, setSaved] = useState(false);

  const update = (field, value) => setSettings(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'company':    return <CompanyProfile s={settings} update={update} />;
      case 'statutory':  return <StatutoryCompliance s={settings} update={update} />;
      case 'cycle':      return <PayrollCycleSettings s={settings} update={update} />;
      case 'bank':       return <BankIntegration s={settings} update={update} />;
      case 'structure':  return <SalaryStructure s={settings} update={update} />;
      default:           return null;
    }
  };

  return (
    <div className="module-settings-root">
      {/* Header */}
      <div className="module-header" style={{ borderBottom: '4px solid #3b82f6' }}>
        <h2 className="tab-heading">⚙️ Company Settings</h2>
        <p className="tab-subheading">Configure statutory registrations, payroll cycle, bank integration, and salary structure templates.</p>
      </div>

      <div className="settings-layout">
        {/* Left rail nav */}
        <nav className="settings-sidenav">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`settings-nav-btn ${activeSection === s.id ? 'settings-nav-btn--active' : ''}`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
          <div style={{ marginTop: 'auto', paddingTop: 16 }}>
            <button
              onClick={handleSave}
              style={{ width: '100%', padding: '10px', background: saved ? '#10b981' : '#2563eb', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13, transition: 'background 0.3s' }}
            >
              {saved ? '✓ Saved!' : '💾 Save Settings'}
            </button>
          </div>
        </nav>

        {/* Right content area */}
        <div className="settings-content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
