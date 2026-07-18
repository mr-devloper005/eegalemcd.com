'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, CheckCircle2, Lock, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'min-h-12 rounded-md border border-[#b7ccda] bg-white px-4 py-3 text-sm font-semibold text-[#161E54] outline-none transition placeholder:text-[#66729a] focus:border-[#161E54] focus:ring-4 focus:ring-[#BBE0EF]/55'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#eef8fc] px-4 py-16 text-[#161E54] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 overflow-hidden border border-[#b7d5e2] bg-white p-7 shadow-[0_30px_90px_rgba(22,30,84,0.10)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center bg-[#161E54] text-[#BBE0EF]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.28em] opacity-55">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-md bg-[#161E54] px-6 py-3 text-sm font-black text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-md border border-[#b7d5e2] bg-white px-6 py-3 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#eef8fc] text-[#161E54]">
        <section className="border-b border-[#b7d5e2] bg-[linear-gradient(110deg,#eef8fc_0%,#fff_55%,#BBE0EF_100%)]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]"><Sparkles className="h-4 w-4" /> {pagesContent.create.hero.badge}</span>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] sm:text-6xl">Share your next <span className="text-[#4e8eaa]">opportunity.</span></h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#4b5682]">Create a clear, useful post that helps the right people discover what you offer and connect with you.</p>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="h-fit border border-[#b7d5e2] bg-[#161E54] p-7 text-white lg:sticky lg:top-36">
              <BadgeCheck className="h-9 w-9 text-[#BBE0EF]" />
              <h2 className="mt-5 text-2xl font-extrabold">Make your post easy to trust.</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-white/75">Use a specific title, choose the closest category, add a helpful image, and include enough detail for visitors to respond confidently.</p>
              <div className="mt-7 border-t border-white/20 pt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#BBE0EF]">Posting as {session.name}</div>
            </aside>

            <form onSubmit={submit} className="border border-[#b7d5e2] bg-white p-5 shadow-[0_24px_70px_rgba(22,30,84,0.10)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4e8eaa]">Create a new post</p>
                  <h2 className="mt-1 text-3xl font-extrabold tracking-[-0.04em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="bg-[#BBE0EF] px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">{activeTask?.label || 'Post'}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#4b5682]">Post type
                  <select className={fieldClass} value={task} onChange={(event) => setTask(event.target.value as TaskKey)}>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </label>
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#161E54] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[#26306b]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
