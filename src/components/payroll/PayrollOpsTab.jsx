import { useState, useCallback } from 'react';
import { loadPayrollRunStore, savePayrollRunStore, createNewPayrun } from '../../data/payrollRunStore';
import { computeEmployeePayroll } from '../../data/payrollEngine';
import PayrollOps_Initiate from './PayrollOps_Initiate';
import PayrollOps_Review from './PayrollOps_Review';
import PayrollOps_Tax from './PayrollOps_Tax';
import PayrollOps_Confirm from './PayrollOps_Confirm';
import PayrollOps_SlipViewer from './PayrollOps_SlipViewer';

const STEPS = [
  { id: 0, icon: '▶', label: 'Initiate' },
  { id: 1, icon: '👀', label: 'Review & Adjust' },
  { id: 2, icon: '📊', label: 'Tax & TDS' },
  { id: 3, icon: '✅', label: 'Confirm & Export' },
  { id: 4, icon: '🧾', label: 'Salary Slips' },
];

export default function PayrollOpsTab() {
  const [store, setStore] = useState(() => loadPayrollRunStore());
  const [activePayrun, setActivePayrun] = useState(null); // payrun object being worked on
  const [step, setStep] = useState(0);

  const persist = useCallback((newStore) => {
    setStore(newStore);
    savePayrollRunStore(newStore);
  }, []);

  // ── Helpers to update employee adjustments within current payrun ─────────────
  const updateAdjustment = useCallback((empId, field, value) => {
    setActivePayrun(prev => {
      const adj = prev.adjustments[empId] || {};
      return { ...prev, adjustments: { ...prev.adjustments, [empId]: { ...adj, [field]: value } } };
    });
  }, []);

  const updateTaxOverride = useCallback((empId, field, value) => {
    setActivePayrun(prev => {
      const ov = prev.taxOverrides[empId] || {};
      return { ...prev, taxOverrides: { ...prev.taxOverrides, [empId]: { ...ov, [field]: value } } };
    });
  }, []);

  const toggleSlip = useCallback((empId) => {
    setActivePayrun(prev => {
      const published = prev.publishedSlips.includes(empId)
        ? prev.publishedSlips.filter(id => id !== empId)
        : [...prev.publishedSlips, empId];
      return { ...prev, publishedSlips: published };
    });
  }, []);

  const publishAll = useCallback((empIds) => {
    setActivePayrun(prev => ({ ...prev, publishedSlips: empIds }));
  }, []);

  // ── Get employees for current payrun ─────────────────────────────────────────
  const getPayrunEmployees = useCallback(() => {
    if (!activePayrun) return [];
    return store.employees
      .filter(e => activePayrun.employeeIds.includes(e.id))
      .map(e => {
        const adj = activePayrun.adjustments[e.id] || {};
        const taxOv = activePayrun.taxOverrides[e.id] || {};
        const merged = {
          ...e,
          daysInMonth: adj.daysInMonth ?? e.daysInMonth,
          lopDays: adj.lopDays ?? e.lopDays,
          overtimeHours: adj.overtimeHours ?? e.overtimeHours,
          otRate: adj.otRate ?? e.otRate,
          leaveEncashmentDays: adj.leaveEncashmentDays ?? e.leaveEncashmentDays,
          arrearEntries: adj.arrearEntries ?? e.arrearEntries,
          salaryComponents: e.salaryComponents.map(c => {
            if (c.type === 'variable' && adj.variablePayouts?.[c.id] !== undefined) {
              return { ...c, currentPayout: adj.variablePayouts[c.id] };
            }
            return c;
          }),
          taxRegime: taxOv.taxRegime ?? e.taxRegime,
          investments80C: taxOv.investments80C ?? e.investments80C,
          medical80D: taxOv.medical80D ?? e.medical80D,
          monthlyRentPaid: taxOv.monthlyRentPaid ?? e.monthlyRentPaid,
          tdsDeductedSoFar: taxOv.tdsDeductedSoFar ?? e.tdsDeductedSoFar,
          monthsRemaining: taxOv.monthsRemaining ?? e.monthsRemaining,
        };
        return { ...merged, computed: computeEmployeePayroll(merged) };
      });
  }, [activePayrun, store.employees]);

  // ── Start a new payrun ────────────────────────────────────────────────────────
  const initiatePayrun = useCallback((month, year, selectedEmpIds) => {
    const employees = store.employees.filter(e => selectedEmpIds.includes(e.id));
    const payrun = createNewPayrun(month, year, employees);
    const newStore = { ...store, payruns: [payrun, ...store.payruns] };
    persist(newStore);
    setActivePayrun(payrun);
    setStep(1);
  }, [store, persist]);

  // ── Confirm payrun ────────────────────────────────────────────────────────────
  const confirmPayrun = useCallback(() => {
    const confirmed = { ...activePayrun, status: 'confirmed', confirmedAt: new Date().toISOString() };
    const newStore = { ...store, payruns: store.payruns.map(p => p.id === confirmed.id ? confirmed : p) };
    persist(newStore);
    setActivePayrun(confirmed);
    setStep(4);
  }, [activePayrun, store, persist]);

  // ── Open an existing payrun ───────────────────────────────────────────────────
  const openPayrun = useCallback((payrun) => {
    setActivePayrun(payrun);
    const statusStepMap = { initiated: 1, reviewed: 2, tax_checked: 3, confirmed: 4, slips_generated: 4 };
    setStep(statusStepMap[payrun.status] ?? 1);
  }, []);

  const payrunEmployees = getPayrunEmployees();

  const sharedProps = {
    store, activePayrun, payrunEmployees,
    updateAdjustment, updateTaxOverride, toggleSlip, publishAll,
    onNext: () => setStep(s => Math.min(4, s + 1)),
    onBack: () => setStep(s => Math.max(0, s - 1)),
  };

  return (
    <div className="module-ops-root">
      {/* Header */}
      <div className="module-header" style={{ borderBottom: '4px solid #8b5cf6' }}>
        <h2 className="tab-heading">▶️ Payroll Operations</h2>
        <p className="tab-subheading">
          End-to-end pay run management — from initiation to salary slip generation.
          {activePayrun && <span className="ops-payrun-badge"> Active: {activePayrun.monthLabel}</span>}
        </p>
      </div>

      {/* Step Tracker */}
      <div className="ops-step-tracker">
        {STEPS.map((s, i) => (
          <div key={s.id} className="ops-step-wrapper">
            <button
              onClick={() => activePayrun && step > 0 && setStep(s.id)}
              disabled={!activePayrun && s.id > 0}
              className={`ops-step-btn ${step === s.id ? 'ops-step-btn--active' : step > s.id ? 'ops-step-btn--done' : 'ops-step-btn--pending'}`}
            >
              <span className="ops-step-icon">{step > s.id ? '✓' : s.icon}</span>
              <span className="ops-step-label">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <div className={`ops-step-connector ${step > i ? 'ops-step-connector--done' : ''}`} />}
          </div>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="ops-content">
        {step === 0 && <PayrollOps_Initiate {...sharedProps} store={store} onOpenPayrun={openPayrun} onInitiate={initiatePayrun} />}
        {step === 1 && <PayrollOps_Review {...sharedProps} />}
        {step === 2 && <PayrollOps_Tax {...sharedProps} />}
        {step === 3 && <PayrollOps_Confirm {...sharedProps} onConfirm={confirmPayrun} />}
        {step === 4 && <PayrollOps_SlipViewer {...sharedProps} />}
      </div>
    </div>
  );
}
