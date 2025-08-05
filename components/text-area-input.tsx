import React from 'react';

type TextAreaInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ value, onChange }) => (
  <div className="win95-form-group">
    <div className="win95-field">
      <label className="win95-label">Show Notes / Timestamps:</label>
      <div className="win95-transcript-container" style={{ height: '250px' }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste your show notes with timestamps here...

Example:
(00:00:00) - Intro
(00:02:30) - Main topic discussion
(00:15:45) - Guest interview`}
          className="win95-transcript-textarea"
        />
      </div>
    </div>
  </div>
);