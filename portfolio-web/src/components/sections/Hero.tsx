import {
  ArrowUpRight,
  ArrowDown,
  Code2,
  Layers,
  Check,
  Smartphone,
} from 'lucide-react';
import { PhoneMockup } from '../ui/PhoneMockup';
export function Hero() {
  return (
    <>
      <section id="home" className="hero container">
        <div className="hero-copy">
          <div className="availability">
            <span /> Available for Freelance Work
          </div>
          <p className="eyebrow hero-eyebrow">YOUR IDEA. A REAL-WORLD APP.</p>
          <h1>
            I Build High-Quality
            <br />
            Mobile Apps for
            <br />
            <span>Startups &amp; Businesses</span>
          </h1>
          <p className="hero-description">
            React Native Developer specializing in fast, scalable Android and
            iOS applications.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Start a Project <ArrowUpRight size={18} />
            </a>
            <a className="button outline" href="#projects">
              View My Work <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-details">
            <span>
              <Code2 size={15} /> React Native Developer
            </span>
            <span>
              <Smartphone size={15} /> Android &amp; iOS
            </span>
          </div>
          <a className="text-link hero-contact" href="#contact">
            Have something in mind? Contact Me <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-dots" />
          <div className="float-card code-card">
            <div className="float-icon">
              <Code2 size={20} />
            </div>
            <div>
              <b>One codebase.</b>
              <span>Two powerful platforms.</span>
            </div>
          </div>
          <div className="hero-phone">
            <PhoneMockup />
          </div>
          <div className="float-card ship-card">
            <div className="check-icon">
              <Check size={17} />
            </div>
            <div>
              <b>Built to perform</b>
              <span>Designed for your users</span>
            </div>
          </div>
          <div className="visual-caption">
            CONCEPT INTERFACE · BUILT WITH PURPOSE
          </div>
        </div>
      </section>
      <div className="tech-strip">
        <div className="container">
          <span>
            THE TOOLS BEHIND
            <br />
            <b>YOUR NEXT BIG IDEA</b>
          </span>
          <span>
            <Code2 /> React Native
          </span>
          <span className="ts-logo">
            TS <b>TypeScript</b>
          </span>
          <span>♨ Firebase</span>
          <span>ϟ Supabase</span>
          <span>
            <Layers /> REST APIs
          </span>
        </div>
      </div>
    </>
  );
}
