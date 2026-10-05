import type { Metadata } from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import BroadcastEdition from './BroadcastEdition';
import './pro-max.css';
const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--bold-body', display: 'swap' });
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--bold-display', display: 'swap' });
export const metadata: Metadata = {
  title: 'GatorBait | Beyond the whistle',
  description: 'Follow the Florida Gators story with Loren Meadows, Buddy Martin and Franz Beard.',
  robots: { index: false, follow: false },
};
export default function Page() {
  return <div className={`${body.variable} ${display.variable}`}><BroadcastEdition /></div>;
}
