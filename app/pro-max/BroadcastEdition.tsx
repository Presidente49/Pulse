'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Minus, Volume2, BookOpen } from 'lucide-react';
import edition from '@/content/stories.json';

type Story = typeof edition.stories[number];
const chapters = [
  { label: 'Before kickoff', tag: 'Loren’s notebook', headline: ['THE ROAD', 'TEST.'], story: edition.stories[3], short: 'The matchup. The questions. The view before kickoff.', theme: 'road' },
  { label: 'After the whistle', tag: 'Buddy’s column', headline: ['NO SOFT', 'LANDING.'], story: edition.stories[0], short: 'Buddy Martin on what happened in Columbia—and what comes next.', theme: 'reaction' },
  { label: 'The response', tag: 'Franz’s perspective', headline: ['NOW', 'WHAT?'], story: edition.stories[1], short: 'The loss is history. How will Florida respond?', theme: 'response' },
];
function Credit({ story }: { story: Story }) {
  return <div className="broadcast-credit"><strong>{story.author}</strong><a href="https://www.gatorbaitmedia.com/">gatorbaitmedia.com</a></div>;
}
export default function BroadcastEdition() {
  const [chapter, setChapter] = useState(0);
  const [sport, setSport] = useState('All stories');
  const [notebook, setNotebook] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = chapters[chapter];
  const stories = edition.stories.filter((s) => sport === 'All stories' || (sport === 'Basketball' ? s.title.includes('Denzel') : !s.title.includes('Denzel')));
  function changeChapter(index: number) { setChapter(index); setNotebook(false); }
  function keyTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % chapters.length;
    else if (event.key === 'ArrowLeft') next = (index + chapters.length - 1) % chapters.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = chapters.length - 1;
    else return;
    event.preventDefault(); changeChapter(next); tabRefs.current[next]?.focus();
  }
  return <div className="broadcast">
    <a className="broadcast-skip" href="#storydesk">Skip to stories</a>
    <div className="broadcast-edition"><span>GATORBAIT MEDIA</span><span>October 4, 2026 edition</span></div>
    <header className="broadcast-header">
      <a href="#top" aria-label="GatorBait home"><Image src="/brand/gatorbait-wordmark.webp" alt="GatorBait" width={900} height={241} unoptimized priority /></a>
      <nav aria-label="Main navigation"><a href="#gameweek">Game week</a><a href="#storydesk">The stories</a><a href="#shows">Watch & listen</a></nav>
      <a className="broadcast-join" href="https://www.gatorbaitmedia.com/pricing-plans/subscribe">Join GatorBait</a>
    </header>
    <main id="top">
      <section className="broadcast-cover" id="gameweek" aria-label="Florida at Missouri story chapters">
        <Image className="broadcast-art" src="/graphics/gatorbait-broadcast.png" fill alt="" unoptimized priority sizes="100vw" />
        <div className="broadcast-cover-top"><span className="broadcast-label">THE GAME WEEK EDITION</span><span>FLORIDA <b>AT</b> MISSOURI <i>/</i> OCT 03</span></div>
        <div className={`broadcast-feature ${selected.theme}`} role="tabpanel" id="chapter-panel" aria-labelledby={`chapter-${chapter}`} tabIndex={0}>
          <div className="broadcast-headline" key={`copy-${chapter}`}>
            <p className="broadcast-kicker">{selected.tag}</p>
            <h1>{selected.headline[0]}<br/><em>{selected.headline[1]}</em></h1>
            <p className="broadcast-deck">{selected.short}</p>
            <a className="broadcast-feature-link" href={selected.story.url}><BookOpen size={18} aria-hidden="true"/>Read {selected.story.author.split(' ')[0]}’s story</a>
          </div>
          <div className="broadcast-photo-wrap" key={`photo-${chapter}`}>
            <div className="broadcast-photo-number" aria-hidden="true">0{chapter + 1}</div>
            <a href={selected.story.url} className="broadcast-photo" aria-label={selected.story.title}><Image src={selected.story.image} alt={chapter === 0 ? 'Florida football coach and players entering the field' : ''} fill unoptimized sizes="(max-width: 720px) 100vw, 55vw" priority /></a>
            <div className="broadcast-photo-credit">{selected.story.credit || `From ${selected.story.author}’s column`}<span>{selected.story.dateLabel}</span></div>
          </div>
        </div>
        <div className="broadcast-chapters" role="tablist" aria-label="Follow the game week story">{chapters.map((item, index) => <button key={item.label} ref={(node) => { tabRefs.current[index] = node; }} role="tab" id={`chapter-${index}`} aria-controls="chapter-panel" aria-selected={chapter === index} tabIndex={chapter === index ? 0 : -1} onClick={() => changeChapter(index)} onKeyDown={(event) => keyTabs(event, index)}><span>0{index + 1}</span><strong>{item.label}</strong><small>{item.story.author}</small></button>)}</div>
      </section>
      <section className="broadcast-notebook" aria-label="Selected story detail">
        <div className="broadcast-notebook-label"><span>IN THE NOTEBOOK</span><span className="broadcast-mark" aria-hidden="true">GB</span></div>
        <div className="broadcast-notebook-copy"><p className="broadcast-date">{selected.story.dateLabel}</p><h2><a href={selected.story.url}>{selected.story.title}</a></h2><Credit story={selected.story}/></div>
        <button className="broadcast-open" onClick={() => setNotebook(!notebook)} aria-expanded={notebook} aria-controls="notebook-excerpt">{notebook ? <Minus size={20}/> : <Plus size={20}/>}<span>{notebook ? 'Close excerpt' : 'Read an excerpt'}</span></button>
        {notebook && <div id="notebook-excerpt" className="broadcast-excerpt"><p>{selected.story.excerpt}</p><a href={selected.story.url}>Continue reading on GatorBait</a></div>}
      </section>
      <div className="broadcast-manifesto"><span>OLD SCHOOL JOURNALISM.</span><span className="broadcast-manifesto-accent">A NEW PERSPECTIVE.</span><span className="broadcast-coordinate">INDEPENDENT / FLORIDA SPORTS</span></div>
      <section id="storydesk" className="broadcast-desk" aria-labelledby="desk-heading">
        <div className="broadcast-desk-heading"><div><p className="broadcast-eyebrow">FROM OUR WRITERS</p><h2 id="desk-heading">THE STORY<br/>KEEPS MOVING.</h2></div><div className="broadcast-filters" aria-label="Filter stories">{['All stories','Football','Basketball'].map(label=><button key={label} aria-pressed={sport===label} onClick={()=>setSport(label)}>{label}</button>)}</div></div>
        <p className="broadcast-result-count" role="status">{stories.length} {stories.length===1?'story':'stories'} · October 2–4</p>
        <div className="broadcast-grid">{stories.map((story,index)=><article className={`broadcast-card ${index===0?'broadcast-card-lead':''}`} key={story.url}><a className="broadcast-card-photo" href={story.url} aria-label={story.title}><Image src={story.image} fill unoptimized sizes="(max-width: 720px) 100vw, 45vw" alt="" loading="lazy"/><span className="broadcast-card-index" aria-hidden="true">{String(index+1).padStart(2,'0')}</span></a><div className="broadcast-card-copy"><time dateTime={story.date}>{story.dateLabel}</time><h3><a href={story.url}>{story.title}</a></h3><Credit story={story}/>{story.credit&&<p className="broadcast-card-credit">{story.credit}</p>}</div></article>)}</div>
        <a className="broadcast-all" href="https://www.gatorbaitmedia.com/gatorbait-media-blogs">Explore the GatorBait archive</a>
      </section>
      <section className="broadcast-show" id="shows">
        <div className="broadcast-show-visual"><div className="broadcast-onair"><Volume2 size={19}/><span>GATORBAIT TV</span></div><p>THE</p><h2>BUDDY<br/>MARTIN<br/><em>SHOW.</em></h2><div className="broadcast-show-bars" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
        <div className="broadcast-show-detail"><p className="broadcast-eyebrow">THE CONVERSATION CONTINUES</p><h3>Pull up a chair.</h3><p>Florida football. Familiar voices.<br/>Room for a strong opinion.</p><div className="broadcast-schedule"><b>MON / WED / THU</b><strong>9:00 <span>PM ET</span></strong></div><a className="broadcast-play" href="https://www.gatorbaitmedia.com/the-buddy-martin-show"><Play size={18} fill="currentColor" aria-hidden="true"/>Watch The Buddy Martin Show</a><a className="broadcast-playlist" href="https://www.youtube.com/playlist?list=PL1twZqsaZwxkNWlp7UJPZYfKWZGGT6bzG">Browse the show playlist</a><p className="broadcast-lowdown"><b>ALSO ON GATORBAIT</b>Florida Gator Lowdown with Loren Meadows<br/>Tuesdays at 9 p.m. ET</p></div>
      </section>
    </main>
    <footer className="broadcast-footer"><Image src="/brand/gatorbait-wordmark.webp" alt="GatorBait" width={900} height={241} unoptimized/><div><a href="https://www.gatorbaitmedia.com/">GatorBaitMedia.com</a><a href="https://www.gatorbaitmedia.com/magazine">The magazine</a><Link href="/">PULSE comparison</Link></div><p>Private design comparison · Fixed October 4 edition · © 2026 GatorBait Media</p></footer>
  </div>;
}
