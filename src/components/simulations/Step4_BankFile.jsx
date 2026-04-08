import React from 'react';

export default function Step4_BankFile({ state }) {
  const { netPay, empName, accNumber, ifsc, updateData } = state;

  const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const mockCsv = `HDFC,${accNumber},${netPay.toFixed(2)},${empName},${today},SALARY,${ifsc}`;

  return (
    <div className="sim-card sim-card-gray" style={{ flex: 1 }}>
      <div className="sim-card-header">
        <h3>Step 4: Bank File Gen</h3>
        <p>Mock NEFT upload file format.</p>
      </div>

      <div className="sim-card-body">
        <div className="sim-input-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="sim-input-group">
            <label>Employee Name</label>
            <input type="text" value={empName} onChange={(e) => updateData('empName', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>Account Number</label>
            <input type="text" value={accNumber} onChange={(e) => updateData('accNumber', e.target.value)} />
          </div>
          <div className="sim-input-group">
            <label>IFSC Code</label>
            <input type="text" value={ifsc} onChange={(e) => updateData('ifsc', e.target.value)} />
          </div>
        </div>

        <div className="code-output-box">
          <div className="code-header">NEFT_Batch_${today}.csv</div>
          <pre className="code-content">{mockCsv}</pre>
        </div>
      </div>
    </div>
  );
}
