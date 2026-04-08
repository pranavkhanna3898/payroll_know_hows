import React from 'react';

export default function Step5_Statutory({ state }) {
  const { pfEmployee, pfEmployer, esiEmployee, esiEmployer, grossSalary } = state;

  const uan = "100987654321";
  const pfEps = Math.min(1250, pfEmployer * (8.33/12));
  const pfErShare = pfEmployer - pfEps;

  const pfEcrString = `${uan}#~#${grossSalary.toFixed(0)}#~#${pfEmployee.toFixed(0)}#~#${pfEps.toFixed(0)}#~#${pfErShare.toFixed(0)}`;
  
  const ipNumber = "5112345678";
  const days = state.daysInMonth - state.lopDays;
  const esiExcelString = `${ipNumber} | ${days} | ${grossSalary.toFixed(0)} | ${esiEmployee.toFixed(0)} | ${esiEmployer.toFixed(0)}`;

  return (
    <div className="sim-card sim-card-gray" style={{ flex: 1 }}>
      <div className="sim-card-header">
        <h3>Step 5: Statutory Submissions</h3>
        <p>Mock ECR & Returns format for compliances.</p>
      </div>

      <div className="sim-card-body">
        <div className="code-output-box">
          <div className="code-header">EPF_ECR_Upload.txt</div>
          <pre className="code-content">{pfEcrString}</pre>
          <div className="code-note">UAN #~# Gross #~# EE Share #~# EPS #~# ER Share</div>
        </div>

        <div className="code-output-box" style={{ marginTop: 16 }}>
          <div className="code-header">ESI_Return_Template.CSV</div>
          <pre className="code-content">{esiExcelString}</pre>
          <div className="code-note">IP Number | Days Worked | Gross Base | EE Contrib | ER Contrib</div>
        </div>
      </div>
    </div>
  );
}
