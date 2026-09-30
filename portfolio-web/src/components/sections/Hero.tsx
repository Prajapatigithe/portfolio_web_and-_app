import {
  ArrowUpRight,
  ArrowDown,
  Code2,
  Layers,
  Check,
  Smartphone,
} from 'lucide-react';
import { availability, contact } from '../../data/site';
import { PhoneMockup } from '../ui/PhoneMockup';
export function Hero() {
  return (
    <>
      <section id="home" className="hero container">
        <div className="hero-copy">
          {availability.freelance && (
            <div className="availability">
              <span /> Available for freelance projects
            </div>
          )}
          <p className="eyebrow hero-eyebrow">
            FREELANCE MOBILE APP DEVELOPMENT
          </p>
          <h1>
            React Native Developer
            <br />
            for <span>Android &amp; iOS Apps</span>
          </h1>
          <p className="hero-description">
            I build fast, reliable and user-friendly mobile apps for startups,
            businesses and growing products.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">
              Start a Project <ArrowUpRight size={18} />
            </a>
            <a className="button outline" href="#projects">
              View Projects <ArrowDown size={16} />
            </a>
          </div>
          <a
            className="text-link hero-whatsapp"
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Me <ArrowUpRight size={16} />
          </a>
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
          <span>Redux</span>
          <span>♨ Firebase</span>
          <span>ϟ Supabase</span>
          <span>
            <Layers /> REST APIs
          </span>
          <span>Android</span>
          <span>iOS</span>
        </div>
      </div>
    </>
  );
}
