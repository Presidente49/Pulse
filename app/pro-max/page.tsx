import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import edition from '@/content/stories.json';
import './pro-max.css';
const body = Barlow({subsets:['latin'],weight:['400','500','600','700','800'],variable:'--bold-body',display:'swap'});
const display = Barlow_Condensed({subsets:['latin'],weight:['600','700','800'],variable:'--bold-display',display:'swap'});
export const metadata: Metadata = {title:'GatorBait | Bold editorial edition',description:'Florida Gators reporting and photography from Buddy Martin, Franz Beard and Loren Meadows.',robots:{index:false,follow:false}};
type Story = typeof edition.stories[number];
function Credit({story}:{story:Story}) { return <div className="gbx-credit"><strong>{story.author}</strong><a href="https://www.gatorbaitmedia.com/">gatorbaitmedia.com</a></div> }
function Photo({story,priority=false}:{story:Story;priority?:boolean}) { return <a className="gbx-photo" href={story.url} aria-label={story.title}><Image src={story.image} alt={priority ? "Florida football coach and players entering the field in orange and blue" : ""} fill unoptimized sizes="(max-width: 760px) 100vw, 60vw" loading={priority?'eager':'lazy'} /></a> }
export default function BoldEdition() {
  const lead=edition.stories.find(s=>s.author==='Loren Meadows')!;
  const voices=edition.stories.slice(0,2);
  const rest=edition.stories.filter(s=>s!==lead&&!voices.includes(s));
  return <div className={`gbx ${body.variable} ${display.variable}`}>
    <a className="gbx-skip" href="#gbx-stories">Skip to stories</a>
    <div className="gbx-edition"><span>Independent voices. Unmistakably GatorBait.</span><time dateTime="2026-10-04">Sunday, October 4, 2026</time></div>
    <header className="gbx-header"><a href="#gbx-top" aria-label="GatorBait home"><Image src="/brand/gatorbait-wordmark.webp" width={900} height={241} alt="GatorBait" unoptimized priority /></a><nav aria-label="Main navigation"><a href="#gbx-stories">Stories</a><a href="#gbx-voices">Our voices</a><a href="#gbx-shows">Watch</a><a href="https://www.gatorbaitmedia.com/magazine">Magazine</a></nav><a className="gbx-join" href="https://www.gatorbaitmedia.com/pricing-plans/subscribe">Join GatorBait</a></header>
    <main id="gbx-top">
      <div className="gbx-intro"><h1>THE GATOR<br className="gbx-mobile-break"/> <span>PERSPECTIVE.</span></h1><p>Football. Basketball.<br/>The people behind the game.</p></div>
      <section className="gbx-top-grid" id="gbx-stories" aria-label="Featured reporting">
        <article className="gbx-lead">
          <div className="gbx-lead-image"><Photo story={lead} priority/><span className="gbx-image-label">Loren Meadows · Football analyst</span></div>
          <div className="gbx-lead-copy"><div className="gbx-meta"><span>From the notebook</span><time dateTime={lead.date}>{lead.dateLabel}</time></div><h2><a href={lead.url}>{lead.title}</a></h2><p className="gbx-deck">{lead.excerpt}</p><div className="gbx-story-foot"><Credit story={lead}/><a className="gbx-read" href={lead.url}>Read Loren’s analysis <span aria-hidden="true">↗</span></a></div><p className="gbx-caption">Florida football · Chris Spears Photography</p></div>
        </article>
        <aside className="gbx-voices" id="gbx-voices"><div className="gbx-section-head"><h2>The voices<br/>{' '}you come for.</h2><span>01 / 02</span></div>{voices.map((story,i)=><article key={story.url} className="gbx-voice"><div className="gbx-meta"><span>{i===0?'The Buddy Martin column':'Franz Beard’s perspective'}</span></div><h3><a href={story.url}>{story.title}</a></h3><p>{story.excerpt}</p><div className="gbx-story-foot"><Credit story={story}/><a className="gbx-small-arrow" href={story.url} aria-label={`Read ${story.title}`}>↗</a></div><time dateTime={story.date}>{story.dateLabel}</time></article>)}</aside>
      </section>
      <section className="gbx-more" aria-labelledby="gbx-more-title"><div className="gbx-section-label"><h2 id="gbx-more-title">Beyond the headline</h2><a href="https://www.gatorbaitmedia.com/gatorbait-media-blogs">All stories ↗</a></div><div className="gbx-story-grid">{rest.map((story,i)=><article key={story.url} className="gbx-story"><Photo story={story}/><div className="gbx-story-body"><div className="gbx-meta"><span>0{i+3}</span><time dateTime={story.date}>{story.dateLabel}</time></div><h3><a href={story.url}>{story.title}</a></h3><Credit story={story}/>{story.credit&&<p className="gbx-caption">{story.credit}</p>}</div></article>)}</div></section>
      <section className="gbx-show" id="gbx-shows"><div className="gbx-show-name"><span>GatorBait TV</span><h2>GOOD COMPANY.<br/><em>GREAT CONVERSATION.</em></h2></div><div className="gbx-show-copy"><h3>The Buddy Martin Show</h3><p>Monday, Wednesday and Thursday<br/>9 p.m. Eastern</p><a href="https://www.gatorbaitmedia.com/the-buddy-martin-show">Watch the show ↗</a><a href="https://www.youtube.com/playlist?list=PL1twZqsaZwxkNWlp7UJPZYfKWZGGT6bzG">Browse the show playlist ↗</a><p className="gbx-lowdown">Florida Gator Lowdown with Loren Meadows<br/>Tuesdays at 9 p.m. Eastern</p></div></section>
    </main>
    <footer className="gbx-footer"><Image src="/brand/gatorbait-wordmark.webp" width={900} height={241} alt="GatorBait" unoptimized/><p>Independent Florida Gators reporting.</p><div><a href="https://www.gatorbaitmedia.com/">Current GatorBait site ↗</a><Link href="/">PULSE comparison ↗</Link></div><small>© 2026 GatorBait Media · Private design comparison · October 4 story selection</small></footer>
  </div>;
}
