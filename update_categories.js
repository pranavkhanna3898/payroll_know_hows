const fs = require('fs');

const ptDetails = require('./src/data/ptDetails').PT_DETAILS;
const lwfDetails = require('./src/data/lwfDetails').LWF_DETAILS;

let content = fs.readFileSync('./src/data/categories.js', 'utf8');

const allKeys = [
  "AN", "AP", "AR", "AS", "BR", "CH", "CG", "DN", "DL", "GA", "GJ", "HR", "HP", 
  "JK", "JH", "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML", "MZ", "NL", "OD", 
  "PY", "PB", "RJ", "SK", "TN", "TG", "TR", "UP", "UK", "WB"
];

const ptStatus = {};
allKeys.forEach(k => {
  if (ptDetails[k] && ptDetails[k].freq !== "N/A") ptStatus[k] = "V";
  else ptStatus[k] = "N";
});

const lwfStatus = {};
allKeys.forEach(k => {
  if (lwfDetails[k] && lwfDetails[k].freq !== "N/A") lwfStatus[k] = "V";
  else lwfStatus[k] = "N";
});

// We need to replace `states: { ... },` lines in categories.js.
// Since categories is structurally predictable, we can use regex.

content = content.replace(/states:\s*{(.+?)},/g, (match, inner) => {
  // If it's PT, we build from ptStatus
  if (inner.includes('MH:"V"') && inner.includes('DL:"N"') && inner.includes('UP:"N"') && !inner.includes('WB:"M"')) { // This matches PT exactly out of the box because LWF WB is M
    const objStr = allKeys.map(k => `${k}:"${ptStatus[k]}"`).join(", ");
    return `states: { ${objStr} },`;
  }
  
  // If it's LWF
  if (inner.includes('WB:"M"') && inner.includes('DL:"M"') && inner.includes('UP:"N"')) {
    // Wait, the previous mapping for LWF had MH:"V", WB:"M", DL:"M".
    // I should probably map the newly added LWF states as V, and N/A as N.
    // For existing ones, I should preserve them.
    // Actually, LWF status can just be "V" (Variable) or "N" (Not Applicable).
    // The previous mapping had some "M" incorrectly or correctly used. Let's just use "V" for applicable, "N" for non-applicable.
    const objStr = allKeys.map(k => `${k}:"${lwfStatus[k]}"`).join(", ");
    return `states: { ${objStr} },`;
  }

  // Otherwise, it's uniform (all M, all O, or all C, or a mix of V).
  // Let's find the majority char (M, O, C, V) to use for the new states.
  let mCount = (inner.match(/"M"/g) || []).length;
  let oCount = (inner.match(/"O"/g) || []).length;
  let cCount = (inner.match(/"C"/g) || []).length;
  let vCount = (inner.match(/"V"/g) || []).length;
  
  let defaultStatus = "M";
  if (oCount > mCount) defaultStatus = "O";
  if (cCount > mCount && cCount > oCount) defaultStatus = "C";
  if (vCount > mCount && vCount > oCount && vCount > cCount) defaultStatus = "V";

  const objStr = allKeys.map(k => `${k}:"${defaultStatus}"`).join(", ");
  return `states: { ${objStr} },`;
});

fs.writeFileSync('./src/data/categories.js', content, 'utf8');
console.log('Categories updated!');
