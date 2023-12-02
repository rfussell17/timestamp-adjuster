// Home.tsx
import { useReducer } from "react";
import { TimestampAdjuster } from "../utils/timestamp-adjuster";
import { TimeInput } from '../components/time-input';
import { TextAreaInput } from '../components/text-area-input';
import { AdjustTimestampsButton } from '../components/adjust-stamps-button';
import Toggle from '../components/toggle';
import { reducer, initialState } from '../reducers/home-reducer';

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
        <TextAreaInput
          value={formState.showNotes}
          onChange={handleShowNotesChange}
        />
        <AdjustTimestampsButton onClick={handleAdjustTimestamps} />
        <div id="result" className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm p-2 rounded-md mt-6 h-50 overflow-auto">
          <pre className="whitespace-pre-wrap">{formState.adjustedShowNotes}</pre>
        </div>
      </main>
      <footer className="bg-teal text-center p-4">Made with ♥ by TPC</footer>
    </div>
  );
};

export default Home;
