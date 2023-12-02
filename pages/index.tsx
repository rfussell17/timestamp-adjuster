import React from 'react';
import dynamic from 'next/dynamic';
import { useReducer } from "react";
import { reducer, initialState } from '../reducers/home-reducer';
import { TimeInput } from '../components/time-input';
import { AdjustTimestampsButton } from '../components/adjust-stamps-button';
import Toggle from '../components/toggle';
import { TimestampAdjuster } from "../utils/timestamp-adjuster";

// Dynamically import RichTextEditor with SSR disabled
const RichTextEditor = dynamic(
  () => import('../utils/rich-text-editor'),
  { ssr: false }
);

const Home: React.FC = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);

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

  return (
    <div className="flex flex-col h-screen">
      <header className="text-4xl text-center p-12 bg-teal">Timestamp Fixxr &apos;95</header>
      <main className="flex-grow container mx-auto p-10 space-y-6">
        <Toggle
          enabled={formState.addTime}
          onChange={() => dispatch({ type: 'TOGGLE_ADD_TIME' })}
          label="Toggle Add/Subtract"
        />
        <Toggle
          enabled={formState.formatWithLeadingZeros}
          onChange={() => dispatch({ type: 'TOGGLE_FORMAT' })}
          label="Format With Leading Zeros"
        />
        <TimeInput
          value={formState.additionalTime}
          onChange={handleAdditionalTimeChange}
          mode={formState.addTime ? 'add' : 'subtract'}
          withLeadingZeros={formState.formatWithLeadingZeros}
        />
        <RichTextEditor
          value={formState.showNotes}
          onChange={handleShowNotesChange}
        />
        <AdjustTimestampsButton onClick={handleAdjustTimestamps} />
        <div 
        
          dangerouslySetInnerHTML={{ __html: formState.adjustedShowNotes }} 
          className="output-content" style={{ backgroundColor: 'white',padding:'1rem', borderRadius:'7px' }}
        />
      </main>
      <footer className="bg-teal text-center p-4">Made with ♥ by TPC</footer>
    </div>
  );
};

export default Home;
