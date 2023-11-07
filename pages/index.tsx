import { useState } from "react";

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

  const parseTime = (timeStr: string): number => {
    const parts = timeStr.split(":").map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  };

  const toTimestamp = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const adjustTimestamps = (): void => {
    const additionalSeconds = parseTime(formState.additionalTime);
    const lines = formState.showNotes.split("\n");
    const adjustedLines = lines.map((line) => {
      const regex = /\((\d{2}:\d{2}:\d{2})\)/;
      const match = line.match(regex);

      if (match && match[1]) {
        const currentSeconds = parseTime(match[1]);
        const adjustedTime = toTimestamp(currentSeconds + additionalSeconds);
        return line.replace(regex, `(${adjustedTime})`);
      }

      return line;
    });

    setFormState({ ...formState, adjustedShowNotes: adjustedLines.join("\n") });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="">Timestamp Fixxr</h1>
      <div className="mb-6">
        <label
          htmlFor="timeInput"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Time to Add (HH:MM:SS)
        </label>
        <input
          id="timeInput"
          type="text"
          value={formState.additionalTime}
          onChange={(e) =>
            setFormState({ ...formState, additionalTime: e.target.value })
          }
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md"
          placeholder="00:02:30"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="timestampsInput"
          className="block text-sm font-medium text-gray-700 mb-2"
        ></label>
        <textarea
          id="timestampsInput"
          value={formState.showNotes}
          onChange={(e) =>
            setFormState({ ...formState, showNotes: e.target.value })
          }
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md"
          rows={10}
          placeholder="(00:00:00) - Intro"
        ></textarea>
      </div>
      <button
        onClick={adjustTimestamps}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Adjust Timestamps
      </button>
      <div
        id="result"
        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md mt-6 h-64 overflow-auto"
      >
        <pre className="whitespace-pre-wrap">{formState.adjustedShowNotes}</pre>
      </div>
    </div>
  );
};

export default Home;
