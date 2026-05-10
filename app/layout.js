import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
  title: 'ethara — Ticket Management',
  description: 'Professional ticket management system with role-based access control',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
