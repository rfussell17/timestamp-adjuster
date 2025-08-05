import React from 'react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type ToggleProps = {
  label: string; 
  enabled?: boolean; 
  onChange: () => void;
};

export default function Toggle({ label, enabled, onChange }: ToggleProps) {
  // Special handling for the add/subtract toggle
  if (label === "Operation Mode (Add/Subtract)") {
    return (
      <div className="win95-field-inline">
        <label className="win95-label" style={{ minWidth: '180px' }}>{label}:</label>
        <button
          onClick={onChange}
          className={`win95-button ${enabled ? 'win95-button-success' : 'win95-button'}`}
          style={{ minWidth: '80px' }}
        >
          {enabled ? 'ADD/+' : 'SUB/-'}
        </button>
      </div>
    );
  }
  
  // Default ON/OFF for other toggles
  return (
    <div className="win95-field-inline">
      <label className="win95-label" style={{ minWidth: '180px' }}>{label}:</label>
      <button
        onClick={onChange}
        className={`win95-button ${enabled ? 'win95-button-success' : ''}`}
        style={{ minWidth: '60px' }}
      >
        {enabled ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}