'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  AlertCircle,
  Sun,
  Moon,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const DEMO = [
  {
    email: 'admin@ethara.dev',
    password: 'admin@1234',
    role: 'Admin',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    email: 'support@ethara.dev',
    password: 'support@123',
    role: 'Support',
    color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  {
    email: 'developer@ethara.dev',
    password: 'dev@1234',
    role: 'Developer',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    email: 'agent@ethara.dev',
    password: 'agent@1234',
    role: 'Agent',
    color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { error } = await createClient().auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-4 top-4 z-50 size-9 rounded-full text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        {/* Brand */}
        <div className="mb-8 text-center">
          {/* <div
            className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-2xl"
            style={{
              fontFamily: 'var(--font-display)',
              boxShadow: '0 0 40px oklch(0.60 0.22 264 / 0.35)',
            }}
          >
            E
          </div> */}

          <h1
            className="text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ethara
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Smart Ticket Management System
          </p>
        </div>

        {/* Card */}
        <Card className="border-border/60 bg-background/70 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-semibold">
              Welcome back
            </CardTitle>

            <CardDescription>
              Sign in to continue to your workspace
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium">
                  Email Address
                </Label>

                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@ethara.dev"
                  required
                  className="h-11 rounded-xl border-border/60 bg-background/60 transition-all focus-visible:ring-2"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium">
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11 rounded-xl border-border/60 bg-background/60 pr-11 transition-all focus-visible:ring-2"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <Alert variant="destructive" className="rounded-xl py-3">
                  <AlertCircle className="size-4" />

                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-xl text-sm font-medium shadow-lg transition-all"
              >
                {loading && <Loader2 className="mr-2 size-4 animate-spin" />}

                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Demo Accounts */}
            <div>
              <p className="mb-3 text-center text-xs text-muted-foreground">
                Quick login — demo accounts
              </p>

              <div className="space-y-2">
                {DEMO.map(acc => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => {
                      setEmail(acc.email)
                      setPassword(acc.password)
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-background/40 px-3 py-3 text-left transition-all hover:bg-accent"
                  >
                    <span className="text-xs text-muted-foreground">
                      {acc.email}
                    </span>

                    <Badge
                      variant="outline"
                      className={cn(
                        'border text-[10px] font-bold uppercase tracking-wider',
                        acc.color
                      )}
                    >
                      {acc.role}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}