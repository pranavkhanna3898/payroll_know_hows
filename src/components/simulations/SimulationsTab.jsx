import { useState } from 'react';
import Step1_Salary from './Step1_Salary';
import Step2_Tax from './Step2_Tax';
import Step3_NetPay from './Step3_NetPay';
import Step4_BankFile from './Step4_BankFile';
import Step5_Statutory from './Step5_Statutory';

export default function SimulationsTab() {
  const [data, setData] = useState({
    // Step 1 Inputs
    ctc: 600000,
    basicPct: 50,
    hraPct: 40,
    daysInMonth: 30,
    lopDays: 0,
    overtimeHours: 0,
    otRate: 500,
    arrears: 0,

    // Step 2 Inputs
    investments80C: 0,
    medical80D: 0,
    hraExempt: 0,
    tdsDeductedSoFar: 0,
    monthsRemaining: 1,

    // Step 3/4/5 Inputs
    empName: "John Doe",
    bankName: "HDFC Bank",
    accNumber: "50100234567890",
    ifsc: "HDFC0001234",
  });

  const updateData = (key, value) => {
    const numValue = isNaN(Number(value)) ? value : Number(value);
    setData(prev => ({ ...prev, [key]: numValue }));
  };

  // Shared derived calculations
  const monthlyCTC = data.ctc / 12;
  const standardBasic = monthlyCTC * (data.basicPct / 100);
  const standardHRA = standardBasic * (data.hraPct / 100);
  const standardSpecial = monthlyCTC - standardBasic - standardHRA;

  const attendanceFactor = Math.max(0, (data.daysInMonth - data.lopDays) / data.daysInMonth);
  const basic = standardBasic * attendanceFactor;
  const hra = standardHRA * attendanceFactor;
  const special = standardSpecial * attendanceFactor;
  const overtimePay = data.overtimeHours * data.otRate;
  
  const grossSalary = basic + hra + special + overtimePay + data.arrears;

  // Tax derivations (Simplified Old Regime Projection)
  const annualGross = (monthlyCTC * 11) + grossSalary; 
  const total80C = Math.min(150000, data.investments80C);
  const taxableIncome = Math.max(0, annualGross - total80C - data.medical80D - data.hraExempt - 50000); 
  
  let annualTax = 0;
  if (taxableIncome > 1000000) {
    annualTax = 112500 + ((taxableIncome - 1000000) * 0.3);
  } else if (taxableIncome > 500000) {
    annualTax = 12500 + ((taxableIncome - 500000) * 0.2);
  } else if (taxableIncome > 250000) {
    annualTax = (taxableIncome - 250000) * 0.05;
    if (taxableIncome <= 500000) annualTax = 0; // standard rebate
  }
  
  const remainingTax = Math.max(0, annualTax - data.tdsDeductedSoFar);
  const tds = data.monthsRemaining > 0 ? (remainingTax / data.monthsRemaining) : 0;

  // Deductions
  const pfEmployee = Math.min(1800, basic * 0.12);
  const pfEmployer = pfEmployee; 
  const esiEmployee = grossSalary <= 21000 ? grossSalary * 0.0075 : 0;
  const esiEmployer = grossSalary <= 21000 ? grossSalary * 0.0325 : 0;
  const pt = 200; 
  const lwf = 25; 
  
  const totalDeductions = pfEmployee + esiEmployee + pt + lwf + tds;
  const netPay = grossSalary - totalDeductions;

  const simState = {
    ...data,
    updateData,
    standardBasic, standardHRA, standardSpecial,
    basic, hra, special, overtimePay, grossSalary, attendanceFactor,
    taxableIncome, annualTax, tds,
    pfEmployee, pfEmployer, esiEmployee, esiEmployer, pt, lwf,
    totalDeductions, netPay
  };

  return (
    <div className="simulations-container">
      <div className="cycle-header" style={{ marginBottom: 32 }}>
        <h2 className="tab-heading">Interactive Payroll Pipeline Simulator</h2>
        <p className="tab-subheading">
          Adjust inputs at each stage to see the real-time downstream impacts across Salary, Taxes, Payouts, and Statutory Compliance.
        </p>
      </div>

      <div className="pipeline-steps">
        <Step1_Salary state={simState} />
        <div className="pipeline-arrow">⬇</div>
        <Step2_Tax state={simState} />
        <div className="pipeline-arrow">⬇</div>
        <Step3_NetPay state={simState} />
        <div className="pipeline-arrow">⬇</div>
        <div className="pipeline-row">
          <Step4_BankFile state={simState} />
          <Step5_Statutory state={simState} />
        </div>
      </div>
    </div>
  );
}
