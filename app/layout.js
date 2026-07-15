import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import layoutStyles from './layout.module.css';

export const metadata = {
  title: 'BytoAcademy | Premium EdTech',
  description: 'A modern, premium EdTech platform for learning programming.',
  keywords: ['edtech', 'learn programming', 'online courses', 'byto academy', 'coding', 'tech skills'],
  authors: [{ name: 'BytoAcademy' }],
  openGraph: {
    title: 'BytoAcademy | Premium EdTech',
    description: 'A modern, premium EdTech platform for learning programming.',
    url: 'https://bytoacademy.com', // You can update this to your actual domain later
    siteName: 'BytoAcademy',
    images: [
      {
        url: '/logo.png', // Uses your public logo
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BytoAcademy | Premium EdTech',
    description: 'A modern, premium EdTech platform for learning programming.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div className={layoutStyles.container}>
          <Sidebar />
          <main className={layoutStyles.mainWrapper}>
            <Header />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
