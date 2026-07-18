import Link from 'next/link'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, MapPin, Search, ShieldCheck, Sparkles, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type Props = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const allPosts = (posts: SitePost[], sections: HomeTimeSection[]) => Array.from(new Map([...posts, ...sections.flatMap(s => s.posts)].map(p => [p.slug || p.id || p.title, p])).values())
const image = (p: SitePost) => getEditablePostImage(p)

function Badge({ post }: { post: SitePost }) { return <span className="market-badge">{getEditableCategory(post) || 'Featured'}</span> }
function Price({ post }: { post: SitePost }) { const c = post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}; const value = c.price || c.budget || c.rate; return value ? <strong className="market-price">{String(value)}</strong> : <strong className="market-price">View details</strong> }

export function EditableHomeHero({ primaryRoute, posts, timeSections }: Props) {
  const pool = allPosts(posts, timeSections); const feature = pool[0]
  return <section className="market-hero">
    <div className={`${wrap} relative grid items-center gap-10 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20`}>
      <div className="hero-copy"><span className="hero-kicker"><Sparkles /> Discover something useful today</span><h1>Find it. Offer it.<br/><em>Make the connection.</em></h1><p>Explore classified products, services, rentals, jobs, and local opportunities ready for your next move.</p>
        <form action="/search" className="hero-search"><Search/><input name="q" placeholder="Search products, services, rentals, jobs..."/><button>Search</button></form>
        <div className="hero-chips"><span>Popular:</span><Link href="/classified">Services</Link><Link href="/classified">For sale</Link><Link href="/classified">Hiring</Link><Link href="/classified">Rentals</Link></div>
      </div>
      <div className="hero-stage">
        {feature ? <Link href={postHref('classified', feature, primaryRoute)} className="hero-feature"><img src={image(feature)} alt={feature.title}/><div><Badge post={feature}/><h2>{feature.title}</h2><Price post={feature}/></div></Link> : <div className="hero-empty"><BriefcaseBusiness/><h2>Fresh opportunities, all in one place</h2></div>}
        <div className="floating-card floating-one"><BadgeCheck/> Clear listing details</div><div className="floating-card floating-two"><Star/> New offers daily</div>
      </div>
    </div>
  </section>
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const pool = allPosts(posts, timeSections).slice(0, 10); if (!pool.length) return null
  return <section className="market-section overflow-hidden"><div className={`${wrap} section-heading`}><div><span>Just added</span><h2>Latest collection</h2></div><Link href={primaryRoute}>See everything <ArrowRight/></Link></div>
    <div className="endless-track">{[...pool,...pool].map((p,i)=><Link key={`${p.id}-${i}`} href={postHref(primaryTask,p,primaryRoute)} className="image-card"><div><img src={image(p)} alt={p.title}/><Badge post={p}/></div><h3>{p.title}</h3><Price post={p}/></Link>)}</div>
  </section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const pool = allPosts(posts,timeSections).slice(0,7); if (!pool.length) return null; const [lead,...rest]=pool
  return <section className="market-section soft"><div className={`${wrap} section-heading center`}><div><span>Explore the marketplace</span><h2>Offers worth a closer look</h2></div></div><div className={`${wrap} discovery-grid`}>
    <Link href={postHref(primaryTask,lead,primaryRoute)} className="feature-card"><img src={image(lead)} alt={lead.title}/><div><Badge post={lead}/><h3>{lead.title}</h3><p>{getEditableExcerpt(lead,180) || 'Open the listing to see complete details and connect directly.'}</p><Price post={lead}/></div></Link>
    <div className="compact-stack">{rest.slice(0,3).map(p=><Link key={p.id||p.slug} href={postHref(primaryTask,p,primaryRoute)} className="horizontal-card"><img src={image(p)} alt={p.title}/><div><Badge post={p}/><h3>{p.title}</h3><span><MapPin/> Details available</span></div></Link>)}</div>
    <div className="editorial-list">{rest.slice(3).map((p,i)=><Link key={p.id||p.slug} href={postHref(primaryTask,p,primaryRoute)}><b>0{i+1}</b><div><small>{getEditableCategory(p)}</small><h3>{p.title}</h3><p>{getEditableExcerpt(p,100)}</p></div><ArrowRight/></Link>)}</div>
  </div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const pool=allPosts(posts,timeSections).slice(7,15); if(!pool.length) return null
  return <section className="market-section"><div className={`${wrap} section-heading`}><div><span>More to explore</span><h2>Classified picks for you</h2></div><Link href="/classified">Browse classifieds <ArrowRight/></Link></div><div className={`${wrap} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>{pool.slice(0,4).map(p=><Link key={p.id||p.slug} href={postHref(primaryTask,p,primaryRoute)} className="group border border-[#c8dce5] bg-white p-3 transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[4/3] overflow-hidden bg-[#eef8fc]"><img src={image(p)} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><Badge post={p}/></div><div className="p-3"><h3 className="line-clamp-2 text-lg font-extrabold">{p.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#4b5682]">{getEditableExcerpt(p,90)||'Open this classified to view the full offer and contact details.'}</p><Price post={p}/></div></Link>)}</div></section>
}

export function EditableHomeCta() { return <><section className="trust-section"><div className={wrap}><h2>Why choose {SITE_CONFIG.name}?</h2><div><article><ShieldCheck/><h3>Simple, clear discovery</h3><p>Useful classified information is easy to scan and straightforward to explore.</p></article><article><BadgeCheck/><h3>Useful listing details</h3><p>Review the category, description, images, price, and contact information in one place.</p></article><article><BriefcaseBusiness/><h3>Made for real needs</h3><p>Buy, sell, hire, rent, or offer a useful service to your community.</p></article></div></div></section><section className="market-cta"><div className={wrap}><div><span>Have something to offer?</span><h2>Put your classified opportunity in front of the right people.</h2></div><Link href="/create">Create a classified <ArrowRight/></Link></div></section></> }
