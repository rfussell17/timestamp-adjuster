type TimeInputProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md"
        placeholder="00:02:30"
      />
    </div>
  );
  