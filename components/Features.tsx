"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import edition from "@/content/stories.json";

gsap.registerPlugin(ScrollTrigger);
const features = edition.stories.filter(s => s.credit);
export default function Features() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current;
      if (!el || !section.current) return;
      const distance = () => Math.max(0, el.scrollWidth - section.current!.clientWidth);
      gsap.to(el, {x: () => -distance(), ease: "none", scrollTrigger: {trigger: section.current, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true}});
    }, section);
    return () => mm.revert();
  }, []);
  return <section ref={section} id="features" className="feature-section">
    <h2>In <span className="text-outline">focus</span></h2>
    <div ref={track} className="feature-track">
      {features.map(s => <article className="feature-card" key={s.url}>
        <a href={s.url} data-cursor="READ"><Image src={s.image} alt="" width={1000} height={625} unoptimized /></a>
        <p className="photo-credit">{s.credit}</p>
        <time dateTime={s.date}>{s.dateLabel}</time>
        <h3><a href={s.url}>{s.title}</a></h3>
        <p>{s.author}</p><a className="publisher-link" href="https://www.gatorbaitmedia.com/">gatorbaitmedia.com</a>
        <a className="read-link" href={s.url}>Read the full story</a>
      </article>)}
    </div>
  </section>;
}
