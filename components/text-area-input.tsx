type TextAreaInputProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export const TextAreaInput: React.FC<TextAreaInputProps> = ({ value, onChange }) => (
    <div className="mb-6">
      <label
        htmlFor="timestampsInput"
        className="block text-gray-700 mb-2"
      >
        Timestamps
      </label>
      <textarea
        id="timestampsInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="resize-none border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 p-2 rounded-md"
        rows={10}
        placeholder="(00:00:00) - Intro"
      ></textarea>
    </div>
  );