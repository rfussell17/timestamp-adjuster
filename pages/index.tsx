import { useState } from "react";

type FormState = {
  additionalTime: string;
  showNotes: string;
  adjustedShowNotes: string;
  outputFormat: "colossus" | "meb";
};

const Home: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    additionalTime: "",
    showNotes: "",
    adjustedShowNotes: "",
    outputFormat: "colossus",
  });

  const [isAddingTime, setIsAddingTime] = useState<boolean>(true); // for toggle

  const parseTime = (timeStr: string): number => {
    // This will handle "HH:MM:SS", "MM:SS", and "H:MM:SS"
    const parts = timeStr.split(":").map(Number);
    let seconds = parts.pop() || 0; // seconds are the last part
    let minutes = parts.pop() || 0; // minutes are the second part or zero if not present
    let hours = parts.pop() || 0; // hours are the first part or zero if not present
    return hours * 3600 + minutes * 60 + seconds;
  };

  const adjustTimestamps = (): void => {
    const additionalSeconds = parseTime(formState.additionalTime);
    const lines = formState.showNotes.split("\n");
    const adjustedLines = lines.map((line) => {
      const regex = /(\d{1,2}):(\d{2})(?::(\d{2}))?/g;
      return line.replace(regex, (match, hours, minutes, seconds) => {
        seconds = seconds || "00";
        const currentSeconds = parseTime(`${hours}:${minutes}:${seconds}`);
        let totalSeconds = isAddingTime
          ? currentSeconds + additionalSeconds
          : Math.max(0, currentSeconds - additionalSeconds);

        console.log(`Original: ${match}, Adjusted Seconds: ${totalSeconds}`);

        const adjustedTime = toTimestamp(totalSeconds, formState.outputFormat);
        console.log(`Adjusted Time: ${adjustedTime}`);

        return adjustedTime;
      });
    });

    setFormState({ ...formState, adjustedShowNotes: adjustedLines.join("\n") });
};



const toTimestamp = (
  totalSeconds: number,
  outputFormat: "colossus" | "meb"
): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  if (outputFormat === "meb") {
    if (hours > 0) {
      // For "meb", format hours without leading zero
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      // If hours are 0, start with minutes and seconds
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  } else {
    // For "colossus", format hours with leading zero
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
};


  

  return (
    <div className="flex flex-col h-screen">
      <header className="text-4xl text-center p-12 bg-teal">
        Timestamp Fixxr &apos;95
      </header>

      <main className="flex-grow container mx-auto p-10 space-y-6">
        <div className="mb-6">
        <div className="mb-6">
        <label
          htmlFor="toggleAddSubtract"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Add/Subtract Time
        </label>
        <div className="flex items-center">
          <input
            id="toggleAddSubtract"
            type="checkbox"
            checked={isAddingTime}
            onChange={() => setIsAddingTime(!isAddingTime)}
            className="mr-2"
          />
          <span>{isAddingTime ? "Add Time" : "Subtract Time"}</span>
        </div>
      </div>
          <span className="text-sm font-medium text-gray-700">
            Output Format:
          </span>
          <div className="flex items-center">
            <input
              id="colossusFormat"
              type="radio"
              name="outputFormat"
              value="colossus"
              checked={formState.outputFormat === "colossus"}
              onChange={() =>
                setFormState({ ...formState, outputFormat: "colossus" })
              }
              className="mr-2"
            />
            <label htmlFor="colossusFormat" className="mr-4">
              Colossus (00:37:27)
            </label>

            <input
              id="mebFormat"
              type="radio"
              name="outputFormat"
              value="meb"
              checked={formState.outputFormat === "meb"}
              onChange={() =>
                setFormState({ ...formState, outputFormat: "meb" })
              }
              className="mr-2"
            />
            <label htmlFor="mebFormat">Meb (1:07:09)</label>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="timeInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Time to Add (MM:SS)
          </label>
          <input
            id="timeInput"
            type="text"
            value={formState.additionalTime}
            onChange={(e) =>
              setFormState({ ...formState, additionalTime: e.target.value })
            }
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md"
            placeholder="02:30"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="timestampsInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Timestamps
          </label>
          <textarea
            id="timestampsInput"
            value={formState.showNotes}
            onChange={(e) =>
              setFormState({ ...formState, showNotes: e.target.value })
            }
            className="resize-none border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md"
            rows={10}
            placeholder="(00:00:00) - Intro"
          ></textarea>
        </div>

        <button
          onClick={adjustTimestamps}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Adjust Timestamps
        </button>

        <div
          id="result"
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full  sm:text-sm  p-2 rounded-md mt-6 h-50 overflow-auto"
        >
          <pre className="whitespace-pre-wrap">
            {formState.adjustedShowNotes}
          </pre>
        </div>
      </main>

      <footer className="bg-cool-gray text-center p-4 mt-8">
        Made with ♥ by TPC
      </footer>
    </div>
  );
};

export default Home;
