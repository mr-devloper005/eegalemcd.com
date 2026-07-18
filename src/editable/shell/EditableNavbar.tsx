'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserRound, X, Plus, LogOut } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const links = [
  { label: 'Classified', href: '/classified' },
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Search', href: '/search' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  return (
    <header className="market-header sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[78px] max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex h-16 w-32 shrink-0 items-center justify-center overflow-hidden sm:w-36" aria-label={`${SITE_CONFIG.name} home`}>
          <img src="/favicon.png" alt={SITE_CONFIG.name} className="h-full w-full scale-[1.45] object-cover" />
        </Link>
        <form action="/search" className="nav-search hidden flex-1 md:flex">
          <input name="q" type="search" placeholder="What are you looking for?" aria-label="Search classified listings" />
          <button aria-label="Search"><Search className="h-5 w-5" /></button>
        </form>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          {session ? <>
            <span className="user-pill"><UserRound className="h-4 w-4" />{session.name || session.email}</span>
            <Link href="/create" className="nav-create"><Plus className="h-4 w-4" /> Create</Link>
            <button onClick={logout} className="nav-quiet"><LogOut className="h-4 w-4" /> Logout</button>
          </> : <><Link href="/login" className="nav-quiet">Login</Link><Link href="/signup" className="nav-create">Sign up</Link></>}
        </div>
        <button onClick={() => setOpen(!open)} className="nav-menu lg:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
      <div className="nav-links hidden border-t border-slate-100 lg:flex">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-8 px-8">
          {links.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>)}
          <Link href="/contact">Contact</Link>
        </div>
      </div>
      {open ? <div className="mobile-drawer lg:hidden">
        <form action="/search" className="nav-search flex"><input name="q" placeholder="Search" /><button aria-label="Search"><Search /></button></form>
        {[...links, { label: 'Contact', href: '/contact' }, ...(session ? [{label:'Create',href:'/create'}] : [{label:'Login',href:'/login'},{label:'Sign up',href:'/signup'}])].map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        {session ? <button onClick={() => { logout(); setOpen(false) }}>Logout</button> : null}
      </div> : null}
    </header>
  )
}
