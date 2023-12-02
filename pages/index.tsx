import { useState } from "react";
import { TimestampAdjuster } from "../utils/timestamp-adjuster";
import { TimeInput } from '../components/time-input';
import { TextAreaInput } from '../components/text-area-input';
import { AdjustTimestampsButton } from '../components/adjust-stamps-button';
import Toggle from '../components/toggle'; 

type FormState = {
  additionalTime: string;
  showNotes: string;
  adjustedShowNotes: string;
};

const Home: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    additionalTime: "",
    showNotes: "",
    adjustedShowNotes: "",
  });

  const [addTime, setAddTime] = useState<boolean>(true); // State for adding or subtracting time

  const adjustTimestamps = (): void => {
    const adjustedNotes = TimestampAdjuster.adjustTimestamps(
      formState.showNotes,
      formState.additionalTime,
      addTime // Pass the addTime state to adjustTimestamps
    );
    setFormState({ ...formState, adjustedShowNotes: adjustedNotes });
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="text-4xl text-center p-12 bg-teal">
        Timestamp Fixxr &apos;95
      </header>

      <main className="flex-grow container mx-auto p-10 space-y-6">
        <Toggle
          enabled={addTime}
          onChange={() => setAddTime(!addTime)}
          label="Toggle Add/Subtract"
        />

<TimeInput
  value={formState.additionalTime}
  onChange={(newTime) => setFormState(prevState => ({ ...prevState, additionalTime: newTime }))}
  mode={addTime ? 'add' : 'subtract'} 
/>


        <TextAreaInput
          value={formState.showNotes}
          onChange={(newNotes) => setFormState(prevState => ({ ...prevState, showNotes: newNotes }))}
        />

        <AdjustTimestampsButton onClick={adjustTimestamps} />

        <div
          id="result"
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm p-2 rounded-md mt-6 h-50 overflow-auto"
        >
          <pre className="whitespace-pre-wrap">
            {formState.adjustedShowNotes}
          </pre>
        </div>
      </main>

      <footer className="bg-teal text-center p-4">Made with ♥ by TPC</footer>
    </div>
  );
};

export default Home;