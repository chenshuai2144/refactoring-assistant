import './globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

import { BaseLayout } from './layout/index';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
          }}
        >
          <BaseLayout>{children}</BaseLayout>
        </div>
      </body>
    </html>
  );
}
