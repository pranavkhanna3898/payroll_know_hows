export const PT_DETAILS = {
  // ── Applicable States with Full Slab Data ──────────────────────────────────

  MH: {
    freq: "Monthly",
    act: "Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975",
    slabs: [
      { range: "Men: Up to ₹7,500 | Women: Up to ₹25,000", amount: "Nil" },
      { range: "Men: ₹7,501–₹10,000", amount: "₹175" },
      { range: "Men & Women: Above ₹10,000 / ₹25,001", amount: "₹200 (₹300 in February)" },
    ],
  },
  KA: {
    freq: "Monthly",
    act: "Karnataka Tax on Professions, Trades, Callings and Employments Act, 1976",
    slabs: [
      { range: "Up to ₹24,999", amount: "Nil" },
      { range: "₹25,000 and above", amount: "₹200" },
    ],
  },
  WB: {
    freq: "Monthly",
    act: "West Bengal State Tax on Professions, Trades, Callings and Employments Act, 1979",
    slabs: [
      { range: "Up to ₹8,500", amount: "Nil" },
      { range: "₹8,501 – ₹10,000", amount: "₹90" },
      { range: "₹10,001 – ₹15,000", amount: "₹110" },
      { range: "₹15,001 – ₹25,000", amount: "₹130" },
      { range: "₹25,001 – ₹40,000", amount: "₹150" },
      { range: "Above ₹40,000", amount: "₹200" },
    ],
  },
  TN: {
    freq: "Half-Yearly",
    act: "Tamil Nadu Municipal Laws (Second Amendment) Act, 1998",
    slabs: [
      { range: "Up to ₹21,000/month", amount: "Nil" },
      { range: "₹21,001–₹30,000/month", amount: "₹135/half-year" },
      { range: "₹30,001–₹45,000/month", amount: "₹315/half-year" },
      { range: "₹45,001–₹60,000/month", amount: "₹690/half-year" },
      { range: "₹60,001–₹75,000/month", amount: "₹1,025/half-year" },
      { range: "Above ₹75,000/month", amount: "₹1,250/half-year" },
    ],
  },
  GJ: {
    freq: "Monthly",
    act: "Gujarat Panchayats, Municipal Corporations and State Tax on Professions, Traders, Callings and Employments Act, 1976",
    slabs: [
      { range: "Up to ₹11,999", amount: "Nil" },
      { range: "₹12,000 and above", amount: "₹200" },
    ],
  },
  AP: {
    freq: "Monthly",
    act: "Andhra Pradesh Tax on Professions, Trades, Callings and Employments Act, 1987",
    slabs: [
      { range: "Up to ₹15,000", amount: "Nil" },
      { range: "₹15,001–₹20,000", amount: "₹150" },
      { range: "Above ₹20,000", amount: "₹200" },
    ],
  },
  TG: {
    freq: "Monthly",
    act: "Telangana Tax on Professions, Trades, Callings and Employments Act, 1987",
    slabs: [
      { range: "Up to ₹15,000", amount: "Nil" },
      { range: "₹15,001–₹20,000", amount: "₹150" },
      { range: "Above ₹20,000", amount: "₹200" },
    ],
  },
  KL: {
    freq: "Half-Yearly",
    act: "Kerala Panchayat Raj (Professional Tax) Rules, 1996",
    slabs: [
      { range: "Up to ₹11,999/month", amount: "Nil" },
      { range: "₹12,000–₹17,999/month", amount: "₹120/half-year" },
      { range: "₹18,000–₹29,999/month", amount: "₹180/half-year" },
      { range: "₹30,000–₹44,999/month", amount: "₹300/half-year" },
      { range: "₹45,000–₹59,999/month", amount: "₹450/half-year" },
      { range: "₹60,000–₹74,999/month", amount: "₹600/half-year" },
      { range: "₹75,000–₹99,999/month", amount: "₹750/half-year" },
      { range: "₹1,00,000–₹1,24,999/month", amount: "₹1,000/half-year" },
      { range: "Above ₹1,25,000/month", amount: "₹1,250/half-year" },
    ],
  },
  MP: {
    freq: "Monthly",
    act: "Madhya Pradesh Vritti Kar Adhiniyam, 1995",
    slabs: [
      { range: "Up to ₹22,500", amount: "Nil" },
      { range: "₹22,501–₹30,000", amount: "₹125" },
      { range: "₹30,001–₹40,000", amount: "₹167" },
      { range: "Above ₹40,000", amount: "₹208 (₹212 in March)" },
    ],
  },
  OD: {
    freq: "Annual (by June 30)",
    act: "Odisha State Tax on Professions, Trades, Callings and Employments Act, 2000",
    slabs: [
      { range: "Up to ₹2,00,000/year", amount: "Nil" },
      { range: "₹2,00,001–₹3,00,000/year", amount: "₹1,000/year" },
      { range: "₹3,00,001–₹5,00,000/year", amount: "₹1,500/year" },
      { range: "Above ₹5,00,000/year", amount: "₹2,500/year" },
    ],
  },
  JH: {
    freq: "Monthly",
    act: "Jharkhand Tax on Professions, Trades, Callings and Employments Act, 2011",
    slabs: [
      { range: "Up to ₹25,000", amount: "Nil" },
      { range: "₹25,001–₹40,000", amount: "₹100" },
      { range: "₹40,001–₹60,000", amount: "₹150" },
      { range: "Above ₹60,000", amount: "₹208" },
    ],
  },
  AS: {
    freq: "Monthly",
    act: "Assam Professions, Trades, Callings and Employments Taxation Act, 1947",
    slabs: [
      { range: "Up to ₹10,000", amount: "Nil" },
      { range: "₹10,001–₹15,000", amount: "₹150" },
      { range: "₹15,001–₹25,000", amount: "₹180" },
      { range: "Above ₹25,000", amount: "₹208" },
    ],
  },
  CG: {
    freq: "Monthly",
    act: "Chhattisgarh Vritti Kar Adhiniyam, 1995",
    slabs: [
      { range: "Up to ₹12,500", amount: "Nil" },
      { range: "₹12,501–₹16,666", amount: "₹130" },
      { range: "₹16,667–₹20,832", amount: "₹170" },
      { range: "₹20,833–₹25,000", amount: "₹190" },
      { range: "Above ₹25,000", amount: "₹200" },
    ],
  },
  GA: {
    freq: "Monthly",
    act: "Goa, Daman and Diu Tax on Professions, Trades, Callings and Employments Act, 1975",
    slabs: [
      { range: "Up to ₹15,000", amount: "Nil" },
      { range: "₹15,001–₹20,000", amount: "₹150" },
      { range: "Above ₹20,000", amount: "₹200" },
    ],
  },
  ML: {
    freq: "Monthly",
    act: "Meghalaya Professions, Trades, Callings and Employments Taxation Act, 1947",
    slabs: [
      { range: "Up to ₹4,166", amount: "Nil" },
      { range: "₹4,167–₹6,250", amount: "₹16.50" },
      { range: "₹6,251–₹8,333", amount: "₹25" },
      { range: "₹8,334–₹12,500", amount: "₹41.50" },
      { range: "₹12,501–₹16,666", amount: "₹62.50" },
      { range: "Above ₹16,667", amount: "₹83.33" },
    ],
  },
  MN: {
    freq: "Monthly",
    act: "Manipur Professions, Trades, Callings and Employments Taxation Act, 1981",
    slabs: [
      { range: "Up to ₹5,000", amount: "Nil" },
      { range: "Above ₹5,000", amount: "₹208" },
    ],
  },
  MZ: {
    freq: "Annual",
    act: "Mizoram Professions, Trades, Callings and Employments Taxation Act, 1995",
    slabs: [
      { range: "Up to ₹6,000/year", amount: "Nil" },
      { range: "₹6,001–₹12,000/year", amount: "₹75/year" },
      { range: "₹12,001–₹18,000/year", amount: "₹150/year" },
      { range: "Above ₹18,000/year", amount: "₹208/year" },
    ],
  },
  TR: {
    freq: "Monthly",
    act: "Tripura Professions, Trades, Callings and Employments Taxation Act, 1997",
    slabs: [
      { range: "Up to ₹5,999", amount: "Nil" },
      { range: "Above ₹6,000", amount: "₹150" },
    ],
  },
  NL: {
    freq: "Monthly",
    act: "Nagaland Professions, Trades, Callings and Employments Taxation Act, 1968",
    slabs: [
      { range: "Up to ₹4,999", amount: "Nil" },
      { range: "₹5,000–₹9,999", amount: "₹70" },
      { range: "₹10,000–₹14,999", amount: "₹104" },
      { range: "Above ₹15,000", amount: "₹208" },
    ],
  },
  SK: {
    freq: "Annual",
    act: "Sikkim Tax on Professions, Trades, Callings and Employments Act, 2006",
    slabs: [
      { range: "Up to ₹20,000/month", amount: "Nil" },
      { range: "₹20,001–₹30,000/month", amount: "₹125/year" },
      { range: "Above ₹30,000/month", amount: "₹200/year" },
    ],
  },
  BR: {
    freq: "Annual",
    act: "Bihar Tax on Professions, Trades, Callings and Employments Act, 2011",
    slabs: [
      { range: "Up to ₹3,00,000/year", amount: "Nil" },
      { range: "₹3,00,001–₹5,00,000/year", amount: "₹1,000/year" },
      { range: "Above ₹5,00,000/year", amount: "₹2,500/year" },
    ],
  },
  PY: {
    freq: "Half-Yearly",
    act: "Puducherry Professional Tax (Municipal)",
    slabs: [
      { range: "Up to ₹83,000 per half-year", amount: "Nil" },
      { range: "Above ₹83,000 per half-year", amount: "₹500/half-year" },
    ],
  },

  // ── Not Applicable ─────────────────────────────────────────────────────────
  AN: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  AR: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  CH: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  DN: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  DL: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  HR: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  HP: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  JK: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  LA: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  LD: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  PB: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  RJ: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  UP: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
  UK: { freq: "N/A", act: "Not Applicable", slabs: [{ range: "Not Applicable", amount: "N/A" }] },
};
