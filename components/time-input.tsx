// time-input.tsx
import React from 'react';

type TimeInputProps = {
  value: string;
  onChange: (value: string) => void;
  mode: 'add' | 'subtract';
  withLeadingZeros: boolean;
};

export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, mode, withLeadingZeros }) => (
  <div className="win95-form-group">
    <div className="win95-field">
      <label className="win95-label">
        Time to {mode === 'add' ? 'Add' : 'Subtract'} {withLeadingZeros ? '(HH:MM:SS)' : '(MM:SS)'}:
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="win95-input-full"
        placeholder={withLeadingZeros ? "00:02:30" : "2:30"}
      />
    </div>
  </div>
);