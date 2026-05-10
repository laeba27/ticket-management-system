import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/supabase/server'
import { Sidebar } from '@/components/layout/Sidebar'
import { CommandPalette } from '@/components/CommandPalette'
import { NotificationBell } from '@/components/layout/NotificationBell'
import DashboardShellClient from '@/components/layout/DashboardShellClient'

export default async function DashboardLayout({ children }) {
  const profile = await getProfile()
  if (!profile) redirect('/login')

  return (
    <DashboardShellClient profile={profile}>{children}</DashboardShellClient>
  )
}
