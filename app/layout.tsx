import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arcane Implode - Cast Your Spells',
  description: 'Transform your rants into magical spells with Arcane Implode',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
