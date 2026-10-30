import './globals.css';

export const metadata = {
  title: 'BytoAcademy | Interactive Coding & EdTech Platform',
  description: 'A distraction-free, interactive EdTech platform guided by the Byto Robot Mascot.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
