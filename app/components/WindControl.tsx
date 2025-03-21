import React from 'react';

interface WindControlProps {
  position: { x: number; y: number };
  windPower: number;
  onWindChange: (power: number) => void;
}

const WindControl: React.FC<WindControlProps> = ({ position, windPower, onWindChange }) => {
  return (
    <div
      className="absolute flex flex-col items-center gap-2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <input
        type="range"
        min="0"
        max="100"
        value={windPower}
        onChange={(e) => onWindChange(Number(e.target.value))}
        className="w-32 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        onClick={() => onWindChange(windPower)}
      >
        吹风 💨
      </button>
      <div className="text-sm text-gray-600">
        风力: {windPower}%
      </div>
    </div>
  );
};

export default WindControl;

