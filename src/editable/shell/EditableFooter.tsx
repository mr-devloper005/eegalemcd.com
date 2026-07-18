'use client'
import Link from 'next/link'
import { ArrowUp, Instagram, Linkedin, Facebook, Check } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  return <footer className="market-footer">
    <div className="footer-benefits"><span><Check /> Simple posting</span><span><Check /> Useful local discovery</span><span><Check /> Clear classified details</span><span><Check /> Direct connections</span></div>
    <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div><Link href="/" className="inline-flex items-center" aria-label={`${SITE_CONFIG.name} home`}><img src="/favicon.png" alt={SITE_CONFIG.name} className="h-20 w-20 object-contain" /></Link><p className="mt-5 max-w-md">A practical place to discover classified offers, services, rentals, jobs, and local opportunities.</p><div className="footer-social"><Instagram/><Linkedin/><Facebook/></div></div>
      <div><h3>Explore</h3><Link href="/classified">Classified</Link><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/search">Search</Link></div>
      <div><h3>Account</h3><Link href="/contact">Contact</Link>{session ? <><Link href="/create">Create</Link><button onClick={logout}>Logout</button></> : <><Link href="/login">Login</Link><Link href="/signup">Sign up</Link></>}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span><a href="#top">Back to top <ArrowUp /></a></div>
  </footer>
}
