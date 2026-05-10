import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Armin — Portfolio',
  description: 'Selected work.',
  openGraph: {
    title: 'Armin — Portfolio',
    description: 'Selected work.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#f4f1ec' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const themeInit = `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: light)').matches;var t=s==='light'||s==='dark'?s:(p?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
