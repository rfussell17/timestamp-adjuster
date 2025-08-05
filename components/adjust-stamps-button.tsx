import React from 'react';

type AdjustTimestampsButtonProps = {
  onClick: () => void;
};

export const AdjustTimestampsButton: React.FC<AdjustTimestampsButtonProps> = ({ onClick }) => (
  <div className="win95-center">
    <button
      onClick={onClick}
      className="win95-button"
      style={{ padding: '8px 24px', fontSize: '14px' }}
    >
      ⚡ Adjust Timestamps
    </button>
  </div>
);

