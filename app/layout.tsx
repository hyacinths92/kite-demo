import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '风筝飞行游戏',
  description: '一个简单的风筝飞行物理模拟游戏',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}

