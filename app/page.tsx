"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ProgressBar from "@/components/ProgressBar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Newsroom from "@/components/Newsroom";
import Features from "@/components/Features";
import Show from "@/components/Show";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Lock scroll until the preloader lifts; refresh triggers once fonts settle.
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    if (loaded) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 400);
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(t);
        window.removeEventListener("load", onLoad);
      };
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <main id="top" className="bg-ink text-bone">
      <SmoothScroll />
      <Cursor />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <ProgressBar />
      <Nav started={loaded} />
      <Hero started={loaded} />
      <Ticker />
      <Newsroom />
      <Features />
      <Show />
      <Footer />
    </main>
  );
}
