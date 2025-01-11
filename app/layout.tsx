import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GroupGear',
  description: 'Plan activities with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="container mx-auto p-4 pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

