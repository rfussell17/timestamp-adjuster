type AdjustTimestampsButtonProps = {
    onClick: () => void;
  };
  
 export const AdjustTimestampsButton: React.FC<AdjustTimestampsButtonProps> = ({ onClick }) => (
    <button
      onClick={onClick}
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-deep-blue hover:bg-deeper-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Adjust Timestamps
    </button>
  );
  