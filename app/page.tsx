"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
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
  return <main id="top" className="bg-ink text-bone">
    <SmoothScroll /><ProgressBar /><Nav /><Hero /><Ticker /><Newsroom /><Features /><Show /><Footer />
  </main>;
}
