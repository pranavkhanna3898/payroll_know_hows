export const LWF_DETAILS = {
  // ── Applicable States ──────────────────────────────────────────────────────

  MH: {
    freq: "Semi-Annual (June & December)",
    act: "Maharashtra Labour Welfare Fund Act, 1953",
    slabs: [
      { range: "Salary ≤ ₹3,000/month", emp: "₹6", er: "₹18", total: "₹24" },
      { range: "Salary > ₹3,000/month", emp: "₹12", er: "₹36", total: "₹48" },
    ],
  },
  KA: {
    freq: "Annual (January)",
    act: "Karnataka Labour Welfare Fund Act, 1965",
    slabs: [{ range: "All Employees", emp: "₹20", er: "₹40", total: "₹60" }],
  },
  WB: {
    freq: "Semi-Annual (June & December)",
    act: "West Bengal Labour Welfare Fund Act, 1974",
    slabs: [{ range: "All Employees", emp: "₹3", er: "₹15", total: "₹18" }],
  },
  TN: {
    freq: "Annual (January)",
    act: "Tamil Nadu Labour Welfare Fund Act, 1972",
    slabs: [{ range: "All Employees", emp: "₹20", er: "₹40", total: "₹60" }],
  },
  GJ: {
    freq: "Semi-Annual (June & December)",
    act: "Gujarat Labour Welfare Fund Act, 1953",
    slabs: [{ range: "All Employees", emp: "₹6", er: "₹12", total: "₹18" }],
  },
  AP: {
    freq: "Annual (December)",
    act: "Andhra Pradesh Labour Welfare Fund Act, 1987",
    slabs: [{ range: "All Employees", emp: "₹30", er: "₹70", total: "₹100" }],
  },
  TG: {
    freq: "Annual (December)",
    act: "Telangana Labour Welfare Fund Act, 1987",
    slabs: [{ range: "All Employees", emp: "₹30", er: "₹70", total: "₹100" }],
  },
  KL: {
    freq: "Monthly",
    act: "Kerala Labour Welfare Fund Act, 1975",
    slabs: [{ range: "All Employees", emp: "₹45", er: "₹45", total: "₹90" }],
  },
  MP: {
    freq: "Semi-Annual (June & December)",
    act: "Madhya Pradesh Shram Kalyan Nidhi Adhiniyam, 1982",
    slabs: [{ range: "All Employees", emp: "₹10", er: "₹30", total: "₹40" }],
  },
  OD: {
    freq: "Semi-Annual (June & December)",
    act: "Odisha Labour Welfare Fund Act, 1996",
    slabs: [{ range: "All Employees", emp: "₹10", er: "₹20", total: "₹30" }],
  },
  DL: {
    freq: "Semi-Annual (June & December)",
    act: "Delhi Labour Welfare Fund Act, 1997",
    slabs: [{ range: "All Employees", emp: "₹0.75", er: "₹2.25", total: "₹3.00" }],
  },
  HR: {
    freq: "Monthly",
    act: "Haryana Labour Welfare Fund Act, 1965",
    slabs: [{ range: "All Employees", emp: "0.2% of salary (max ₹31)", er: "0.4% of salary (max ₹62)", total: "0.6% of salary (max ₹93)" }],
  },
  PB: {
    freq: "Monthly",
    act: "Punjab Labour Welfare Fund Act, 1965",
    slabs: [{ range: "All Employees", emp: "0.2% of salary (max ₹31)", er: "0.4% of salary (max ₹62)", total: "0.6% of salary (max ₹93)" }],
  },
  JH: {
    freq: "Annual (December)",
    act: "Jharkhand Labour Welfare Fund Act, 1996",
    slabs: [{ range: "All Employees", emp: "₹5", er: "₹15", total: "₹20" }],
  },
  CH: {
    freq: "Monthly",
    act: "Punjab Labour Welfare Fund Act, 1965 (extended to UT Chandigarh)",
    slabs: [{ range: "All Employees", emp: "₹5", er: "₹20", total: "₹25" }],
  },
  CG: {
    freq: "Semi-Annual (June & December)",
    act: "Chhattisgarh Shram Kalyan Nidhi Adhiniyam, 1982",
    slabs: [{ range: "All Employees", emp: "₹15", er: "₹45", total: "₹60" }],
  },
  GA: {
    freq: "Monthly",
    act: "Goa Labour Welfare Fund Act, 1986",
    slabs: [{ range: "All Employees", emp: "₹10", er: "₹20", total: "₹30" }],
  },

  // ── Not Applicable ─────────────────────────────────────────────────────────
  AN: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  AR: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  AS: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  BR: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  DN: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  HP: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  JK: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  LA: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  LD: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  ML: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  MN: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  MZ: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  NL: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  PY: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  RJ: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  SK: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  TR: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  UP: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
  UK: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", emp: "N/A", er: "N/A", total: "N/A" }] },
};
