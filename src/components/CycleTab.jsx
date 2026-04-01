import { useState, useMemo } from 'react';
import { PAYROLL_CYCLE } from '../data';

export default function CycleTab() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  const activeStep = selectedStep || hoveredStep;

  // Helper mapping for quick lookup
  const allStepsMap = useMemo(() => {
    const map = {};
    PAYROLL_CYCLE.forEach(p => {
      p.steps.forEach(s => {
        map[s.id] = s;
      });
    });
    return map;
  }, []);

  const isDependency = (stepId, targetStepId) => {
    if (!targetStepId) return false;
    const targetObj = allStepsMap[targetStepId];
    if (!targetObj) return false;
    return targetObj.dependencies.includes(stepId);
  };

  const isDependentOnTarget = (stepId, targetStepId) => {
    if (!targetStepId) return false;
    const currentObj = allStepsMap[stepId];
    if (!currentObj) return false;
    return currentObj.dependencies.includes(targetStepId);
  };

  // Get lists of linked step names for the chips
  const getDependencyChips = (stepId) => {
    const obj = allStepsMap[stepId];
    if (!obj || !obj.dependencies || obj.dependencies.length === 0) return [];
    return obj.dependencies.map(id => ({ id, title: allStepsMap[id]?.title || id }));
  };

  const getDependentChips = (stepId) => {
    const dependents = [];
    Object.values(allStepsMap).forEach(s => {
      if (s.dependencies && s.dependencies.includes(stepId)) {
        dependents.push({ id: s.id, title: s.title });
      }
    });
    return dependents;
  };

  const handleCardClick = (stepId) => {
    if (selectedStep === stepId) {
        setSelectedStep(null); // Toggle off if clicked again
    } else {
        setSelectedStep(stepId); // Lock selection
    }
  };

  return (
    <div className="cycle-container">
      <div className="cycle-header">
        <h2 className="tab-heading">Indian Payroll Cycle & Data Flow</h2>
        <p className="tab-subheading" style={{ marginBottom: 24, maxWidth: 800 }}>
          Hover over or click any step to see its interdependencies. 
          Steps highlighted in <span style={{ color: '#10b981', fontWeight: 600 }}>green</span> provide data to the selected step. 
          Steps highlighted in <span style={{ color: '#8b5cf6', fontWeight: 600 }}>purple</span> depend on data from the selected step.
        </p>
      </div>

      <div className="cycle-timeline">
        {PAYROLL_CYCLE.map((phase, pIndex) => (
          <div key={pIndex} className="cycle-phase-block">
            <div className="cycle-phase-header" style={{ borderLeftColor: phase.color }}>
              <div className="phase-title" style={{ color: phase.color }}>{phase.phase}</div>
              <div className="phase-timeline">{phase.timeline}</div>
            </div>
            
            <div className="cycle-steps-list">
              {phase.steps.map((step) => {
                const isDep = isDependency(step.id, activeStep);
                const isDependant = isDependentOnTarget(step.id, activeStep);
                const isActive = activeStep === step.id;
                
                let cardClass = "cycle-step-card detailed-card clickable-card";
                if (activeStep && !isActive && !isDep && !isDependant) cardClass += " cycle-step-dimmed";
                if (isActive) cardClass += selectedStep === step.id ? " cycle-step-selected-card" : " cycle-step-active-card";
                if (isDep) cardClass += " cycle-step-dependency";
                if (isDependant) cardClass += " cycle-step-dependent";

                const dependencyChips = getDependencyChips(step.id);
                const dependentChips = getDependentChips(step.id);

                return (
                  <div 
                    key={step.id} 
                    className={cardClass}
                    onClick={() => handleCardClick(step.id)}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    style={{ borderLeftColor: isActive || isDep || isDependant ? undefined : phase.color }}
                  >
                    <div className="detailed-card-header">
                      <div className="step-id">{step.id.toUpperCase().replace('-', ' ')}</div>
                      <div className="step-title">{step.title}</div>
                      {selectedStep === step.id && (
                          <div className="pin-badge">📌 Pinned</div>
                      )}
                    </div>
                    <div className="step-desc" style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>
                      {step.description}
                    </div>

                    {(isActive || selectedStep === step.id) && (dependencyChips.length > 0 || dependentChips.length > 0) && (
                      <div className="linked-chips-container">
                        {dependencyChips.length > 0 && (
                          <div className="chip-row">
                            <span className="chip-label">Inputs from:</span>
                            {dependencyChips.map(c => (
                              <span key={c.id} className="flow-chip chip-input">↑ {c.title}</span>
                            ))}
                          </div>
                        )}
                        {dependentChips.length > 0 && (
                          <div className="chip-row">
                            <span className="chip-label">Outputs to:</span>
                            {dependentChips.map(c => (
                              <span key={c.id} className="flow-chip chip-output">↓ {c.title}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="detailed-card-grid">
                      {step.dataDependencies && step.dataDependencies.length > 0 && (
                        <div className="detail-section">
                          <div className="detail-label">📥 Data Inputs / Dependencies</div>
                          <div className="detail-value">
                            {step.dataDependencies.join(" • ")}
                          </div>
                        </div>
                      )}
                      
                      {step.calculationLogic && (
                        <div className="detail-section">
                          <div className="detail-label">🧮 Calculation Logic</div>
                          <div className="detail-value formula-text">
                            {step.calculationLogic}
                          </div>
                        </div>
                      )}

                      {step.interdependenciesText && (
                        <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
                          <div className="detail-label">🔗 Interdependencies & Flow</div>
                          <div className="detail-value text-muted">
                            {step.interdependenciesText}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {step.statutory && step.statutory.length > 0 && (
                      <div className="step-statutory-tags" style={{ marginTop: 16 }}>
                        {step.statutory.map((stat, i) => (
                          <span key={i} className="stat-tag">🏛️ {stat}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
