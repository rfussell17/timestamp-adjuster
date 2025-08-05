// pages/index.tsx or app/page.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { useReducer, useState, useEffect } from "react";
import { reducer, initialState } from '../reducers/home-reducer';
import { TimeInput } from '../components/time-input';
import { AdjustTimestampsButton } from '../components/adjust-stamps-button';
import Toggle from '../components/toggle';
import { TimestampAdjuster } from "../utils/timestamp-adjuster";

const RichTextEditor = dynamic(
  () => import('../utils/rich-text-editor'),
  { ssr: false }
);

const Home: React.FC = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handleAdditionalTimeChange = (newTime: string) => 
    dispatch({ type: 'SET_ADDITIONAL_TIME', payload: newTime });

  const handleShowNotesChange = (newNotes: string) => 
    dispatch({ type: 'SET_SHOW_NOTES', payload: newNotes });

  const handleAdjustTimestamps = () => {
    const adjustedNotes = TimestampAdjuster.adjustTimestamps(
      formState.showNotes,
      formState.additionalTime,
      formState.addTime,
      formState.formatWithLeadingZeros
    );
    dispatch({ type: 'SET_ADJUSTED_SHOW_NOTES', payload: adjustedNotes });
  };

  const copyToClipboard = (text: string) => {
    const textToCopy = text.replace(/<[^>]*>/g, ''); // Strip HTML tags
    navigator.clipboard.writeText(textToCopy);
    alert("Text copied to clipboard! 📋");
  };

  return (
    <div className="win95-desktop">
      <div className="max-w-6xl mx-auto p-4">
        {/* Windows 95 Title Bar */}
        <div className="win95-window mb-4">
          <div className="win95-titlebar">
            <div className="win95-titlebar-icon">⏰</div>
            <span className="win95-titlebar-text">
              Timestamp Fixxr '95 v2.0 - [Running]
            </span>
          </div>

          <div className="win95-title-content">
            <h1>Timestamp Adjustment System</h1>
            <p>
              Professional timestamp correction tool for podcast show notes and transcripts
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="win95-panel">
          <div className="win95-panel-header">Timestamp Configuration</div>
          <div className="win95-panel-content">
            
            {/* Settings Group */}
            <div className="win95-form-group">
              <Toggle
                enabled={formState.addTime}
                onChange={() => dispatch({ type: 'TOGGLE_ADD_TIME' })}
                label="Operation Mode (Add/Subtract)"
              />
              
              <Toggle
                enabled={formState.formatWithLeadingZeros}
                onChange={() => dispatch({ type: 'TOGGLE_FORMAT' })}
                label="Format With Leading Zeros"
              />
            </div>

            {/* Time Input */}
            <TimeInput
              value={formState.additionalTime}
              onChange={handleAdditionalTimeChange}
              mode={formState.addTime ? 'add' : 'subtract'}
              withLeadingZeros={formState.formatWithLeadingZeros}
            />

            {/* Rich Text Editor */}
            <div className="win95-form-group">
              <div className="win95-field">
                <label className="win95-label">Show Notes / Timestamps:</label>
                <div className="win95-transcript-container" style={{ height: '250px' }}>
                  <RichTextEditor
                    value={formState.showNotes}
                    onChange={handleShowNotesChange}
                  />
                </div>
              </div>
            </div>

            {/* Adjust Button */}
            <AdjustTimestampsButton onClick={handleAdjustTimestamps} />
          </div>
        </div>

        {/* Output Panel */}
        {formState.adjustedShowNotes && (
          <div className="win95-panel">
            <div className="win95-panel-header win95-header-flex">
              <span>Adjusted Timestamps Output</span>
              <button
                onClick={() => copyToClipboard(formState.adjustedShowNotes)}
                className="win95-button win95-button-success"
                style={{ fontSize: '12px', padding: '2px 8px' }}
              >
                📋 Copy
              </button>
            </div>

            <div className="win95-panel-content">
              <div className="win95-output">
                <div 
                  dangerouslySetInnerHTML={{ __html: formState.adjustedShowNotes }}
                  style={{ 
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    lineHeight: '1.2',
                    color: 'black'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Combined Status Bar and Footer */}
        <div className="win95-status-footer" style={{ marginTop: '0px' }}>
          <div className="win95-status-footer-top">
            <span>
              Ready | Mode: {formState.addTime ? 'Add +' : 'Sub -'} | 
              Format: {formState.formatWithLeadingZeros ? 'HH:MM:SS' : 'MM:SS'}
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;