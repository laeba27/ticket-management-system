"use client"

import { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { CommandPalette } from '@/components/CommandPalette'
import { NotificationBell } from '@/components/layout/NotificationBell'
import { Menu } from 'lucide-react'

export default function DashboardShellClient({ children, profile }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar profile={profile} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-14 shrink-0 border-b border-border flex items-center justify-between px-4 sm:px-6 gap-2 bg-background/80 backdrop-blur-sm relative z-[9999]">
          <div className="flex items-center gap-2">
            <button
              aria-label="Open sidebar"
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent sm:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
          <div className="flex items-center">
            <NotificationBell />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-7 animate-fade-up">
          {children}
        </main>
      </div>
      <CommandPalette profile={profile} />
    </div>
  )
}
