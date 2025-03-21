'use client';

import { useEffect, useState, useCallback } from 'react';
import Kite from './components/Kite';
import WindControl from './components/WindControl';

const GRAVITY = 0.2;
const WIND_FORCE_MULTIPLIER = 0.05;
const DRAG = 0.98;

export default function Home() {
  const [kitePosition, setKitePosition] = useState({ x: 300, y: 200 });
  const [kiteVelocity, setKiteVelocity] = useState({ x: 0, y: 0 });
  const [kiteRotation, setKiteRotation] = useState(0);
  const [windPower, setWindPower] = useState(0);

  const updateKitePhysics = useCallback(() => {
    setKitePosition((prev) => {
      // 计算新的速度
      const newVelocityX = (kiteVelocity.x + windPower * WIND_FORCE_MULTIPLIER) * DRAG;
      const newVelocityY = (kiteVelocity.y + GRAVITY) * DRAG;

      // 更新速度状态
      setKiteVelocity({ x: newVelocityX, y: newVelocityY });

      // 计算新的位置
      const newX = prev.x + newVelocityX;
      const newY = prev.y + newVelocityY;

      // 计算风筝旋转角度（基于速度方向）
      const angle = Math.atan2(newVelocityY, newVelocityX) * (180 / Math.PI);
      setKiteRotation(angle);

      // 边界检查
      if (newX < 0 || newX > window.innerWidth - 100) {
        setKiteVelocity(v => ({ ...v, x: -v.x * 0.5 }));
        return { ...prev, x: newX < 0 ? 0 : window.innerWidth - 100 };
      }
      if (newY < 0 || newY > window.innerHeight - 100) {
        setKiteVelocity(v => ({ ...v, y: -v.y * 0.5 }));
        return { ...prev, y: newY < 0 ? 0 : window.innerHeight - 100 };
      }

      return { x: newX, y: newY };
    });
  }, [kiteVelocity, windPower]);

  useEffect(() => {
    const gameLoop = () => {
      updateKitePhysics();
      requestAnimationFrame(gameLoop);
    };
    const animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [updateKitePhysics]);

  return (
    <main className="relative w-screen h-screen bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden">
      <Kite position={kitePosition} rotation={kiteRotation} />
      <WindControl
        position={{ x: kitePosition.x + 150, y: kitePosition.y }}
        windPower={windPower}
        onWindChange={setWindPower}
      />
    </main>
  );
}
