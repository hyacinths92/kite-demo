import React from 'react';

interface KiteProps {
  position: { x: number; y: number };
  rotation: number;
}

const Kite: React.FC<KiteProps> = ({ position, rotation }) => {
  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* 风筝主体 - 菱形 */}
      <div className="relative w-20 h-20 transform rotate-45 bg-gradient-to-br from-red-500 to-yellow-500">
        {/* 风筝十字骨架 */}
        <div className="absolute w-full h-0.5 bg-white top-1/2 -translate-y-1/2"></div>
        <div className="absolute h-full w-0.5 bg-white left-1/2 -translate-x-1/2"></div>
        
        {/* 风筝尾巴 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-32 bg-white origin-top">
          {/* 尾巴装饰 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-red-400 rounded-full"
              style={{
                top: `${i * 6}rem`,
                left: '-0.75rem',
                transform: 'rotate(-45deg)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kite;

