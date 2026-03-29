import { useState, useEffect } from "react";

// ─── EMAILJS CONFIG ───────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_nbuwex8";
const EMAILJS_TEMPLATE_ID = "template_fmg4mib";
const EMAILJS_PUBLIC_KEY  = "3Q9cd6sgAmBrg9TUv";
// ─────────────────────────────────────────────────────────────────────────────

// ── Put logo.png and brochure.pdf inside your React project's /public folder ─
const LOGO_PATH      = "/logo.png";
const BROCHURE_PATH  = "/SAPTAASHWA_ENTERPRISES_PORTFOLIO.pdf"; // ← rename if needed

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

  /* ── Gotham via system fallback (or self-hosted) ── */
  /* If you have Gotham licensed: place gotham.woff2 in /public/fonts/ and uncomment below */
  /*
  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/gotham-bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Gotham';
    src: url('/fonts/gotham-book.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  */

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-dark: #8B6914;
    --teal: #1B6B5A;
    --teal-light: #2A9478;
    --black: #080808;
    --black-soft: #111111;
    --black-card: #0D0D0D;
    --white: #F5F0E8;
    --white-dim: rgba(245, 240, 232, 0.7);

    /* Font stacks */
    --font-heading:   'Cinzel Decorative', 'Cinzel', serif;
    --font-content:   'Cinzel', serif;
    --font-company:   'Gotham', 'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif;
    --font-body:      'Cormorant Garamond', serif;
    --font-ui:        'Montserrat', sans-serif;
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--font-body);
    overflow-x: hidden;
    cursor: none;
  }

  @media (hover: hover) {
    .cursor {
      position: fixed; width: 12px; height: 12px;
      background: var(--gold); border-radius: 50%;
      pointer-events: none; z-index: 99999;
      transform: translate(-50%, -50%);
      transition: width .3s, height .3s;
      mix-blend-mode: difference;
    }
    .cursor-follower {
      position: fixed; width: 40px; height: 40px;
      border: 1px solid rgba(201,168,76,.5); border-radius: 50%;
      pointer-events: none; z-index: 99998;
      transform: translate(-50%, -50%);
      transition: left .15s ease, top .15s ease;
    }
  }
  @media (hover: none) { body { cursor: auto; } .cursor, .cursor-follower { display: none; } }

  body::before {
    content: ''; position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: .4;
  }

  /* ══ NAV ══ */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 18px 60px;
    display: flex; align-items: center; justify-content: space-between;
    transition: all .5s ease;
  }
  .nav.scrolled {
    background: rgba(8,8,8,.96); backdrop-filter: blur(20px);
    padding: 12px 60px; border-bottom: 1px solid rgba(201,168,76,.15);
  }
  .nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .nav-logo-img {
    height: 44px; width: auto;
    filter: drop-shadow(0 0 8px rgba(201,168,76,.4)); transition: filter .3s;
  }
  .nav-brand:hover .nav-logo-img { filter: drop-shadow(0 0 18px rgba(201,168,76,.7)); }
  .nav-brand-text {
    font-family: var(--font-company);
    font-size: .88rem; font-weight: 700;
    letter-spacing: .22em; color: var(--gold); line-height: 1.15;
    text-transform: uppercase;
  }
  .nav-brand-text small {
    display: block; font-size: .52rem; letter-spacing: .3em;
    color: var(--teal-light); font-weight: 400;
  }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: var(--font-ui); font-size: .68rem; font-weight: 500;
    letter-spacing: .18em; text-transform: uppercase;
    color: var(--white-dim); text-decoration: none;
    transition: color .3s; position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1px; background: var(--gold); transition: width .3s;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-links a:hover::after { width: 100%; }

  /* Download button in nav */
  .nav-download {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 18px;
    border: 1px solid rgba(201,168,76,.4);
    color: var(--gold);
    font-family: var(--font-ui); font-size: .62rem; font-weight: 600;
    letter-spacing: .18em; text-transform: uppercase;
    text-decoration: none; background: transparent;
    cursor: pointer;
    transition: all .3s; white-space: nowrap;
  }
  .nav-download:hover { background: rgba(201,168,76,.1); border-color: var(--gold); }
  .nav-download svg { flex-shrink: 0; }

  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px; z-index: 1001;
  }
  .hamburger span { display: block; width: 24px; height: 2px; background: var(--gold); transition: all .3s; }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    display: none; position: fixed; inset: 0;
    background: rgba(8,8,8,.98); z-index: 999;
    flex-direction: column; align-items: center; justify-content: center; gap: 36px;
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu a {
    font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700;
    letter-spacing: .12em; color: var(--white); text-decoration: none; transition: color .3s;
  }
  .mobile-menu a:hover { color: var(--gold); }
  .mobile-menu .mobile-download {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 28px; border: 1px solid var(--gold);
    color: var(--gold); font-family: var(--font-ui); font-size: .72rem;
    font-weight: 600; letter-spacing: .18em; text-transform: uppercase;
    text-decoration: none; margin-top: 10px;
    transition: all .3s;
  }
  .mobile-menu .mobile-download:hover { background: rgba(201,168,76,.1); }

  /* ══ HERO ══ */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
    background:
      radial-gradient(ellipse at 70% 50%, rgba(27,107,90,.08) 0%, transparent 60%),
      radial-gradient(ellipse at 30% 80%, rgba(201,168,76,.06) 0%, transparent 50%),
      var(--black);
  }
  .hero-bg-lines {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,.04) 1px, transparent 1px);
    background-size: 80px 80px; animation: gridPulse 8s ease-in-out infinite;
  }
  @keyframes gridPulse { 0%,100%{opacity:.5;} 50%{opacity:1;} }
  .hero-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%);
    top: 50%; left: 60%; transform: translate(-50%,-50%);
    animation: glowPulse 4s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6;}
    50%{transform:translate(-50%,-50%) scale(1.2);opacity:1;}
  }
  .hero-content {
    position: relative; z-index: 2; text-align: center;
    max-width: 900px; padding: 0 24px;
  }
  .hero-logo {
    width: clamp(130px, 22vw, 210px); height: auto; margin: 0 auto 28px;
    filter: drop-shadow(0 0 32px rgba(201,168,76,.55));
    animation: fadeUp 1s ease .1s both, float 4s ease-in-out 1.2s infinite;
  }
  @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  .hero-eyebrow {
    font-family: var(--font-ui); font-size: .65rem; font-weight: 500;
    letter-spacing: .45em; text-transform: uppercase; color: var(--teal-light);
    margin-bottom: 22px; animation: fadeUp 1s ease .3s both;
  }
  .hero-title {
    font-family: var(--font-company);
    font-size: clamp(2.2rem, 6vw, 5.5rem);
    font-weight: 700; line-height: 1; letter-spacing: .12em; color: var(--white);
    margin-bottom: 6px; animation: fadeUp 1s ease .6s both;
    text-transform: uppercase;
  }
  .hero-title-sub {
    font-family: var(--font-company);
    font-size: clamp(1rem, 2.5vw, 2rem);
    font-weight: 400; letter-spacing: .35em; text-transform: uppercase;
    margin-bottom: 14px; animation: fadeUp 1s ease .7s both;
    background: linear-gradient(135deg,var(--gold-light),var(--gold),var(--gold-dark));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-subtitle {
    font-family: var(--font-body); font-size: clamp(.9rem,2vw,1.25rem);
    font-weight: 300; font-style: italic; letter-spacing: .15em; color: var(--white-dim);
    margin-bottom: 42px; animation: fadeUp 1s ease .9s both;
  }
  .hero-cta {
    display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;
    animation: fadeUp 1s ease 1.2s both;
  }
  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: fadeIn 1s ease 2s both;
  }
  .hero-scroll span {
    font-family: var(--font-ui); font-size: .58rem;
    letter-spacing: .3em; text-transform: uppercase; color: var(--white-dim);
  }
  .scroll-line {
    width: 1px; height: 46px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollDown 2s ease-in-out infinite;
  }
  @keyframes scrollDown {
    0%{transform:scaleY(0);transform-origin:top;} 50%{transform:scaleY(1);transform-origin:top;}
    51%{transform:scaleY(1);transform-origin:bottom;} 100%{transform:scaleY(0);transform-origin:bottom;}
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px);} to{opacity:1;transform:translateY(0);} }
  @keyframes fadeIn { from{opacity:0;} to{opacity:1;} }

  /* ══ BUTTONS ══ */
  .btn-primary {
    display: inline-block; padding: 13px 36px;
    background: linear-gradient(135deg,var(--gold),var(--gold-dark));
    color: var(--black); font-family: var(--font-ui);
    font-size: .68rem; font-weight: 600; letter-spacing: .22em; text-transform: uppercase;
    text-decoration: none; border: none; cursor: pointer;
    position: relative; overflow: hidden; transition: transform .3s, box-shadow .3s;
  }
  .btn-primary::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg,var(--gold-light),var(--gold));
    opacity: 0; transition: opacity .3s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(201,168,76,.3); }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary span { position: relative; z-index: 1; }

  .btn-outline {
    display: inline-block; padding: 13px 36px; background: transparent; color: var(--gold);
    font-family: var(--font-ui); font-size: .68rem; font-weight: 600;
    letter-spacing: .22em; text-transform: uppercase;
    text-decoration: none; border: 1px solid rgba(201,168,76,.5); transition: all .3s;
  }
  .btn-outline:hover { background: rgba(201,168,76,.08); border-color: var(--gold); }

  /* Download CTA button */
  .btn-download {
    display: inline-flex; align-items: center; gap: 10px; padding: 13px 36px;
    background: transparent; color: var(--white);
    font-family: var(--font-ui); font-size: .68rem; font-weight: 600;
    letter-spacing: .22em; text-transform: uppercase;
    text-decoration: none; border: 1px solid rgba(245,240,232,.25);
    transition: all .3s; cursor: pointer;
  }
  .btn-download:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,.05); }
  .btn-download svg { transition: transform .3s; }
  .btn-download:hover svg { transform: translateY(2px); }

  /* ══ SECTIONS ══ */
  section { padding: 110px 60px; position: relative; overflow: hidden; }
  .section-label {
    font-family: var(--font-ui); font-size: .6rem; font-weight: 500;
    letter-spacing: .45em; text-transform: uppercase; color: var(--teal-light); margin-bottom: 18px;
  }
  .section-title {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem,3vw,2.8rem);
    font-weight: 700; color: var(--white); line-height: 1.15; margin-bottom: 22px;
  }
  .section-title .gold { color: var(--gold); }
  .section-divider { width: 56px; height: 2px; background: linear-gradient(to right,var(--gold),transparent); margin-bottom: 36px; }
  .gold-line { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
  .gold-line::before { content: ''; width: 28px; height: 1px; background: var(--gold); }

  /* Paragraph text uses Cinzel */
  p, .about-text p, .mv-card p, .service-card p, .step-content p, .marketing-card p, .partnership-inner p, .contact-item-text p {
    font-family: var(--font-content);
    font-size: .92rem !important;
    line-height: 1.95 !important;
    font-weight: 400;
    letter-spacing: .03em;
  }

  /* ══ ABOUT ══ */
  .about { background: var(--black-soft); }
  .about-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: 400px; }
  .about-ring { position: absolute; border-radius: 50%; border: 1px solid; animation: rotate 20s linear infinite; }
  .about-ring-1 { width: 300px; height: 300px; border-color: rgba(201,168,76,.15); }
  .about-ring-2 { width: 400px; height: 400px; border-color: rgba(27,107,90,.1); animation-direction:reverse; animation-duration:30s; }
  .about-ring-3 { width: 480px; height: 480px; border-color: rgba(201,168,76,.05); animation-duration:40s; }
  @keyframes rotate { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
  .about-logo-img {
    width: clamp(160px,22vw,260px); height: auto; position: relative; z-index: 2;
    filter: drop-shadow(0 0 40px rgba(201,168,76,.45));
    animation: float 4s ease-in-out infinite;
  }
  .about-stats { display: flex; gap: 36px; margin-top: 36px; flex-wrap: wrap; }
  .stat { border-left: 2px solid var(--gold); padding-left: 18px; }
  .stat-number { font-family: var(--font-heading); font-size: 1.7rem; font-weight: 700; color: var(--gold); line-height: 1; }
  .stat-label { font-family: var(--font-ui); font-size: .6rem; letter-spacing: .2em; text-transform: uppercase; color: var(--white-dim); margin-top: 4px; }

  /* ══ BROCHURE BANNER ══ */
  .brochure-banner {
    background: linear-gradient(135deg, rgba(201,168,76,.08) 0%, rgba(27,107,90,.06) 50%, rgba(201,168,76,.05) 100%);
    border-top: 1px solid rgba(201,168,76,.15);
    border-bottom: 1px solid rgba(201,168,76,.15);
    padding: 50px 60px;
  }
  .brochure-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap;
  }
  .brochure-text h3 {
    font-family: var(--font-heading); font-size: clamp(1.2rem,2.5vw,2rem);
    font-weight: 700; color: var(--white); margin-bottom: 10px;
  }
  .brochure-text p {
    font-family: var(--font-content) !important;
    font-size: .9rem !important; color: var(--white-dim);
    letter-spacing: .04em;
  }
  .brochure-icon {
    width: 64px; height: 64px; flex-shrink: 0;
    border: 1px solid rgba(201,168,76,.3); display: flex; align-items: center; justify-content: center;
    font-size: 1.8rem; background: rgba(201,168,76,.06);
  }
  .brochure-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

  /* ══ MISSION/VISION ══ */
  .mv-section { background: var(--black); }
  .mv-section::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(27,107,90,.05) 0%,transparent 50%,rgba(201,168,76,.03) 100%); pointer-events:none; }
  .mv-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
  .mv-card { padding: 64px 56px; background: var(--black-card); position: relative; overflow: hidden; transition: transform .4s; }
  .mv-card:hover { transform: translateY(-4px); }
  .mv-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(to right,var(--gold),var(--teal)); transform:scaleX(0); transition:transform .5s; }
  .mv-card:hover::before { transform: scaleX(1); }
  .mv-card-bg { position:absolute; font-family:var(--font-heading); font-size:9rem; font-weight:900; color:rgba(201,168,76,.03); top:50%; right:-10px; transform:translateY(-50%); pointer-events:none; user-select:none; }
  .mv-icon { font-size: 2.2rem; margin-bottom: 22px; display: block; }
  .mv-card h3 { font-family:var(--font-heading); font-size:1.3rem; font-weight:700; color:var(--gold); letter-spacing:.08em; margin-bottom:18px; }

  /* ══ SERVICES ══ */
  .services { background: var(--black-soft); }
  .services-inner { max-width: 1200px; margin: 0 auto; }
  .services-header { text-align: center; margin-bottom: 70px; }
  .services-header .section-divider { margin: 0 auto 36px; }
  .services-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
  .service-card { background:var(--black-card); padding:56px 36px; position:relative; overflow:hidden; transition:all .4s; }
  .service-card::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(201,168,76,.05),transparent); opacity:0; transition:opacity .4s; }
  .service-card:hover { transform: translateY(-6px); }
  .service-card:hover::after { opacity: 1; }
  .service-number { font-family:var(--font-heading); font-size:3.5rem; font-weight:900; color:rgba(201,168,76,.08); position:absolute; top:18px; right:26px; line-height:1; transition:color .4s; }
  .service-card:hover .service-number { color: rgba(201,168,76,.15); }
  .service-icon { width:52px; height:52px; border:1px solid rgba(201,168,76,.3); display:flex; align-items:center; justify-content:center; font-size:1.4rem; margin-bottom:24px; position:relative; z-index:1; transition:border-color .3s,background .3s; }
  .service-card:hover .service-icon { border-color:var(--gold); background:rgba(201,168,76,.08); }
  .service-card h3 { font-family:var(--font-heading); font-size:.95rem; font-weight:700; color:var(--white); letter-spacing:.06em; margin-bottom:14px; position:relative; z-index:1; transition:color .3s; }
  .service-card:hover h3 { color: var(--gold); }

  /* ══ APPROACH ══ */
  .approach { background: var(--black); }
  .approach-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1.2fr; gap:90px; align-items:start; }
  .approach-steps { display:flex; flex-direction:column; margin-top:18px; }
  .approach-step { display:flex; gap:26px; padding:26px 0; border-bottom:1px solid rgba(201,168,76,.08); transition:all .3s; }
  .approach-step:hover { padding-left:10px; border-bottom-color:rgba(201,168,76,.2); }
  .step-num { font-family:var(--font-heading); font-size:.65rem; color:var(--gold); letter-spacing:.1em; min-width:28px; padding-top:4px; }
  .step-content h4 { font-family:var(--font-heading); font-size:.85rem; font-weight:700; color:var(--white); letter-spacing:.05em; margin-bottom:7px; }
  .marketing-card { background:var(--black-card); border:1px solid rgba(201,168,76,.1); padding:54px 50px; position:relative; overflow:hidden; }
  .marketing-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:100%; background:linear-gradient(to bottom,var(--gold),var(--teal)); }
  .marketing-card h3 { font-family:var(--font-heading); font-size:1.1rem; font-weight:700; color:var(--gold); letter-spacing:.08em; margin-bottom:22px; }
  .marketing-tags { display:flex; flex-wrap:wrap; gap:9px; margin-top:28px; }
  .tag { padding:7px 16px; border:1px solid rgba(201,168,76,.25); font-family:var(--font-ui); font-size:.62rem; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); transition:all .3s; }
  .tag:hover { background: rgba(201,168,76,.1); }

  /* ══ PARTNERSHIP ══ */
  .partnership { background: var(--black-soft); }
  .partnership::before { content:''; position:absolute; top:-200px; right:-200px; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle,rgba(27,107,90,.08) 0%,transparent 70%); pointer-events:none; }
  .partnership-inner { max-width:880px; margin:0 auto; text-align:center; }
  .partnership-inner .section-divider { margin:0 auto 36px; }
  .partnership-pillars { display:flex; justify-content:center; gap:50px; flex-wrap:wrap; margin:54px 0; }
  .pillar { display:flex; flex-direction:column; align-items:center; gap:10px; }
  .pillar-icon { width:62px; height:62px; border:1px solid rgba(201,168,76,.3); display:flex; align-items:center; justify-content:center; font-size:1.5rem; background:rgba(201,168,76,.04); transition:all .3s; }
  .pillar:hover .pillar-icon { border-color:var(--gold); background:rgba(201,168,76,.1); transform:translateY(-4px); }
  .pillar span { font-family:var(--font-ui); font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:var(--white-dim); }

  /* ══ CONTACT ══ */
  .contact { background: var(--black); }
  .contact::before { content:''; position:absolute; inset:0; background:linear-gradient(to bottom,transparent,rgba(201,168,76,.025)); pointer-events:none; }
  .contact-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 1.1fr; gap:90px; align-items:start; }
  .contact-heading { font-family:var(--font-heading); font-size:clamp(1.4rem,2.5vw,2.3rem); font-weight:700; color:var(--white); margin-bottom:40px; line-height:1.2; }
  .contact-heading span { color: var(--gold); }
  .contact-items { display:flex; flex-direction:column; gap:26px; }
  .contact-item { display:flex; gap:18px; align-items:flex-start; }
  .contact-item-icon { width:42px; height:42px; flex-shrink:0; border:1px solid rgba(201,168,76,.2); display:flex; align-items:center; justify-content:center; font-size:1.05rem; color:var(--gold); }
  .contact-item-text span { display:block; font-family:var(--font-ui); font-size:.58rem; letter-spacing:.24em; text-transform:uppercase; color:var(--teal-light); margin-bottom:5px; }

  .contact-form { display:flex; flex-direction:column; gap:14px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .form-group { display:flex; flex-direction:column; }
  .form-group label { font-family:var(--font-ui); font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:var(--white-dim); margin-bottom:7px; }
  .form-group input,
  .form-group textarea,
  .form-group select {
    background:rgba(255,255,255,.03); border:1px solid rgba(201,168,76,.15);
    padding:13px 16px; color:var(--white);
    font-family:var(--font-content); font-size:.9rem;
    outline:none; transition:border-color .3s; width:100%; -webkit-appearance:none;
  }
  .form-group input::placeholder,
  .form-group textarea::placeholder { color:rgba(245,240,232,.3); font-family:var(--font-content); }
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus { border-color:var(--gold); }
  .form-group textarea { resize:vertical; min-height:110px; }
  .form-group select { color:var(--white-dim); }
  .form-group select option { background:var(--black); color:var(--white); }
  .form-status { padding:13px 18px; text-align:center; font-family:var(--font-ui); font-size:.72rem; letter-spacing:.08em; }
  .form-status.success { border:1px solid rgba(42,148,120,.4); color:var(--teal-light); background:rgba(42,148,120,.06); }
  .form-status.error   { border:1px solid rgba(201,100,76,.4); color:#e08060; background:rgba(201,100,76,.06); }

  /* ══ FOOTER ══ */
  footer { background:var(--black-card); padding:36px 60px; border-top:1px solid rgba(201,168,76,.1); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
  .footer-left { display:flex; align-items:center; gap:14px; }
  .footer-logo { height:36px; width:auto; filter:drop-shadow(0 0 6px rgba(201,168,76,.35)); }
  .footer-brand { font-family:var(--font-company); font-size:.85rem; font-weight:700; letter-spacing:.28em; color:var(--gold); text-transform:uppercase; }
  .footer-tagline { font-family:var(--font-body); font-style:italic; font-size:.9rem; color:var(--white-dim); letter-spacing:.1em; }
  .footer-copy { font-family:var(--font-ui); font-size:.58rem; letter-spacing:.13em; color:rgba(245,240,232,.28); }

  /* ══ REVEAL ══ */
  .reveal { opacity:0; transform:translateY(36px); transition:opacity .8s ease,transform .8s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-delay-1{transition-delay:.1s;} .reveal-delay-2{transition-delay:.2s;}
  .reveal-delay-3{transition-delay:.3s;} .reveal-delay-4{transition-delay:.4s;}

  /* ══ RESPONSIVE ══ */
  @media (max-width: 1024px) {
    section { padding: 90px 40px; }
    .nav, .nav.scrolled { padding-left: 40px; padding-right: 40px; }
    .brochure-banner { padding: 40px; }
  }
  @media (max-width: 768px) {
    .nav { padding: 14px 20px; }
    .nav.scrolled { padding: 10px 20px; }
    .nav-links { display: none; }
    .nav-download { display: none; }
    .hamburger { display: flex; }
    .nav-brand-text { display: none; }
    section { padding: 72px 20px; }
    .brochure-banner { padding: 36px 20px; }
    .brochure-inner { flex-direction: column; align-items: flex-start; }
    .hero-logo { width: 140px; }
    .hero-title { font-size: clamp(1.8rem,8vw,2.8rem); }
    .hero-title-sub { font-size: clamp(.8rem,3vw,1.2rem); }
    .hero-scroll { display: none; }
    .about-inner { grid-template-columns: 1fr; }
    .about-visual { display: none; }
    .mv-grid { grid-template-columns: 1fr; }
    .mv-card { padding: 40px 28px; }
    .services-grid { grid-template-columns: 1fr; }
    .approach-inner { grid-template-columns: 1fr; }
    .marketing-card { padding: 34px 26px; }
    .partnership-pillars { gap: 22px; }
    .contact-inner { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 28px 20px; flex-direction: column; text-align: center; }
    .footer-left { justify-content: center; }
    .footer-tagline { display: none; }
  }
  @media (max-width: 400px) {
    .hero-title { font-size: 1.7rem; letter-spacing: .08em; }
    .hero-cta { flex-direction: column; align-items: center; }
    .btn-primary, .btn-outline, .btn-download { width: 100%; text-align: center; justify-content: center; }
  }
`;

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

// ── Download icon SVG ─────────────────────────────────────────────────────────
const DownloadIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function SaptaashwaWebsite() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [cursor,     setCursor]     = useState({ x: -100, y: -100 });
  const [follower,   setFollower]   = useState({ x: -100, y: -100 });
  const [formData,   setFormData]   = useState({ name:"", company:"", email:"", phone:"", interest:"", message:"" });
  const [formStatus, setFormStatus] = useState(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = e => {
      setCursor({ x: e.clientX, y: e.clientY });
      setTimeout(() => setFollower({ x: e.clientX, y: e.clientY }), 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  formData.name,
        from_email: formData.email,
        phone:      formData.phone,
        company:    formData.company,
        interest:   formData.interest,
        message:    formData.message,
        to_email:   "saptaashwaenterprises@gmail.com",
      });
      setFormStatus("success");
      setFormData({ name:"", company:"", email:"", phone:"", interest:"", message:"" });
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    }
    setTimeout(() => setFormStatus(null), 6000);
  };

  const navLinks = ["About","Services","Approach","Partnership","Contact"];

  return (
    <>
      <style>{style}</style>

      <div className="cursor"          style={{ left: cursor.x,   top: cursor.y   }} />
      <div className="cursor-follower" style={{ left: follower.x, top: follower.y }} />

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a
          href={BROCHURE_PATH}
          download="Saptaashwa_Enterprises_Brochure.pdf"
          className="mobile-download"
          onClick={() => setMenuOpen(false)}
        >
          <DownloadIcon size={14} /> Download Brochure
        </a>
      </div>

      {/* ══ NAV ══ */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#hero" className="nav-brand">
          <img src={LOGO_PATH} alt="Saptaashwa" className="nav-logo-img" />
          <div className="nav-brand-text">
            SAPTAASHWA
            <small>ENTERPRISES</small>
          </div>
        </a>
        <ul className="nav-links">
          {navLinks.map(l => <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>)}
        </ul>
        <a
          href={BROCHURE_PATH}
          download="Saptaashwa_Enterprises_Brochure.pdf"
          className="nav-download"
        >
          <DownloadIcon size={13} /> Brochure
        </a>
        <button className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" id="hero">
        <div className="hero-bg-lines" />
        <div className="hero-glow" />
        <div className="hero-content">
          <img src={LOGO_PATH} alt="Saptaashwa Enterprises" className="hero-logo" />
          <p className="hero-eyebrow">Distribution &amp; Marketing · Shivamogga, Karnataka</p>
          <h1 className="hero-title">SAPTAASHWA</h1>
          <div className="hero-title-sub">ENTERPRISES</div>
          <p className="hero-subtitle">Harnessing Strength, Delivering Success</p>
          <div className="hero-cta">
            <a href="#about"   className="btn-primary"><span>Discover More</span></a>
            <a href="#contact" className="btn-outline">Partner With Us</a>
            <a
              href={BROCHURE_PATH}
              download="Saptaashwa_Enterprises_Brochure.pdf"
              className="btn-download"
            >
              <DownloadIcon size={14}/> <span>Brochure</span>
            </a>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line"/></div>
      </section>

      {/* ══ ABOUT ══ */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-visual reveal">
            <div className="about-ring about-ring-3"/>
            <div className="about-ring about-ring-2"/>
            <div className="about-ring about-ring-1"/>
            <img src={LOGO_PATH} alt="Saptaashwa" className="about-logo-img"/>
          </div>
          <div className="about-text">
            <div className="reveal">
              <div className="gold-line"><p className="section-label">Company Overview</p></div>
              <h2 className="section-title">Building Bridges Between <span className="gold">Brands &amp; Markets</span></h2>
              <div className="section-divider"/>
            </div>
            <div className="reveal reveal-delay-1">
              <p>Saptaashwa is a newly established distribution and marketing company founded in 2026, based in Shivamogga, Karnataka. We build strong partnerships with manufacturers, brands, and retailers through reliable distribution and effective market support.</p>
              <p style={{marginTop:"16px"}}>As a growing company, we work with one product or brand at a time — ensuring proper attention, promotion, and market development for every product we represent.</p>
            </div>
            <div className="about-stats reveal reveal-delay-2">
              {[{num:"2026",label:"Founded"},{num:"KA",label:"Karnataka"},{num:"1:1",label:"Brand Focus"}].map(s=>(
                <div className="stat" key={s.label}>
                  <div className="stat-number">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BROCHURE DOWNLOAD BANNER ══ */}
      <div className="brochure-banner reveal">
        <div className="brochure-inner">
          <div className="brochure-icon">📄</div>
          <div className="brochure-text">
            <h3>Download Our Brochure</h3>
            <p>Get the complete Saptaashwa Enterprises portfolio — our services, approach, and partnership details in one document.</p>
          </div>
          <div className="brochure-actions">
            <a
              href={BROCHURE_PATH}
              download="Saptaashwa_Enterprises_Brochure.pdf"
              className="btn-primary"
            >
              <span style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <DownloadIcon size={14}/> Download PDF
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ══ MISSION / VISION ══ */}
      <section className="mv-section" id="mission">
        <div className="mv-grid">
          <div className="mv-card reveal">
            <div className="mv-card-bg">M</div>
            <span className="mv-icon">🎯</span>
            <h3>Our Mission</h3>
            <p>To provide reliable distribution and marketing support that helps brands expand their reach and grow their presence in the Karnataka market — bridging the gap between manufacturers and retailers with precision and dedication.</p>
          </div>
          <div className="mv-card reveal reveal-delay-2">
            <div className="mv-card-bg">V</div>
            <span className="mv-icon">🌟</span>
            <h3>Our Vision</h3>
            <p>To become the most trusted distribution and marketing partner for companies expanding their products across Karnataka — known for integrity, consistency, and the genuine care we bring to every brand we represent.</p>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="services" id="services">
        <div className="services-inner">
          <div className="services-header reveal">
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">Our <span className="gold">Services</span></h2>
            <div className="section-divider"/>
          </div>
          <div className="services-grid">
            {[
              {num:"01",icon:"🚚",title:"Distribution",      desc:"We ensure products move efficiently from manufacturers to retailers and wholesalers through a reliable, carefully managed supply network across Karnataka."},
              {num:"02",icon:"📣",title:"Marketing Support", desc:"We support brands by promoting their products and building strong awareness among retailers and customers through targeted, on-ground engagement."},
              {num:"03",icon:"📈",title:"Market Development",desc:"Building strong product presence and consistent availability — developing each market carefully to ensure steady, sustainable brand growth."},
            ].map((s,i)=>(
              <div className={`service-card reveal reveal-delay-${i+1}`} key={s.num}>
                <div className="service-number">{s.num}</div>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPROACH ══ */}
      <section className="approach" id="approach">
        <div className="approach-inner">
          <div>
            <div className="reveal">
              <div className="gold-line"><p className="section-label">How We Work</p></div>
              <h2 className="section-title">Our <span className="gold">Approach</span></h2>
              <div className="section-divider"/>
            </div>
            <div className="approach-steps">
              {[
                {num:"01",title:"Strong Retailer Relations",  desc:"We build genuine, lasting relationships with retailers and wholesalers through direct personal visits and consistent follow-up."},
                {num:"02",title:"Effective Market Promotion", desc:"Every brand we represent receives full promotional focus — ensuring strong visibility and product recognition in the market."},
                {num:"03",title:"Reliable Supply & Service",  desc:"Consistent availability, timely delivery, and dependable service form the backbone of everything we do."},
                {num:"04",title:"Sustainable Growth",         desc:"We prioritize steady, long-term market development over short-term gains — supporting brands that think ahead."},
              ].map((step,i)=>(
                <div className={`approach-step reveal reveal-delay-${i}`} key={step.num}>
                  <div className="step-num">{step.num}</div>
                  <div className="step-content"><h4>{step.title}</h4><p>{step.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="marketing-card">
              <h3>Marketing Approach</h3>
              <p>Our strategy combines personalized in-person engagement, telemarketing, and WhatsApp communication to reach retailers and customers effectively. By visiting directly, we build strong relationships and understand needs firsthand. Telemarketing enables efficient follow-up and prompt query resolution. WhatsApp keeps partners informed with updates and promotions.</p>
              <div className="marketing-tags">
                {["In-Person Visits","Telemarketing","WhatsApp","Brand Promotion","Retailer Engagement","Market Coverage"].map(tag=>(
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PARTNERSHIP ══ */}
      <section className="partnership" id="partnership">
        <div className="partnership-inner">
          <div className="reveal">
            <div className="gold-line" style={{justifyContent:"center"}}>
              <p className="section-label">Grow With Us</p>
            </div>
            <h2 className="section-title" style={{textAlign:"center"}}>Partnership <span className="gold">Opportunity</span></h2>
            <div className="section-divider"/>
          </div>
          <div className="reveal reveal-delay-1">
            <p>Saptaashwa is actively looking to partner with companies and brands that want to expand their presence across Karnataka. We are committed to building strong and long-term business relationships based on trust, dedication, and consistent market development.</p>
            <p style={{marginTop:"16px"}}>We believe in focusing on one product or brand at a time — giving it full attention to ensure proper promotion, retailer engagement, and steady market growth.</p>
          </div>
          <div className="partnership-pillars reveal reveal-delay-2">
            {[{icon:"🤝",label:"Trust"},{icon:"💎",label:"Dedication"},{icon:"📊",label:"Growth"},{icon:"🌱",label:"Consistency"}].map(p=>(
              <div className="pillar" key={p.label}>
                <div className="pillar-icon">{p.icon}</div>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
          <div className="reveal reveal-delay-3" style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="#contact" className="btn-primary"><span>Start a Conversation</span></a>
            <a
              href={BROCHURE_PATH}
              download="Saptaashwa_Enterprises_Brochure.pdf"
              className="btn-download"
            >
              <DownloadIcon size={14}/> <span>Download Brochure</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div>
            <div className="reveal">
              <div className="gold-line"><p className="section-label">Get In Touch</p></div>
              <h2 className="contact-heading">Let's Build <span>Something</span> Together</h2>
            </div>
            <div className="contact-items">
              {[
                {icon:"📍",label:"Address",  text:"2nd Floor, Chaya Nilaya, 4th Cross,\nHosamane Extension, Shivamogga – 577201"},
                {icon:"📞",label:"Phone",    text:"+91 91870 46927"},
                {icon:"💬",label:"WhatsApp", text:"+91 91870 46927"},
                {icon:"✉️",label:"Email",    text:"saptaashwaenterprises@gmail.com"},
                {icon:"🏛️",label:"GST",      text:"29ASGPC3225P1ZI"},
              ].map((item,i)=>(
                <div className={`contact-item reveal reveal-delay-${i}`} key={item.label}>
                  <div className="contact-item-icon">{item.icon}</div>
                  <div className="contact-item-text">
                    <span>{item.label}</span>
                    <p style={{whiteSpace:"pre-line"}}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" placeholder="Full name" value={formData.name}
                  onChange={e=>setFormData({...formData,name:e.target.value})} required/>
              </div>
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="Company name" value={formData.company}
                  onChange={e=>setFormData({...formData,company:e.target.value})}/>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" placeholder="your@email.com" value={formData.email}
                  onChange={e=>setFormData({...formData,email:e.target.value})} required/>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone}
                  onChange={e=>setFormData({...formData,phone:e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <label>Area of Interest</label>
              <select value={formData.interest} onChange={e=>setFormData({...formData,interest:e.target.value})}>
                <option value="">Select interest</option>
                <option>Distribution Partnership</option>
                <option>Marketing Support</option>
                <option>Brand Representation</option>
                <option>General Enquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your product or enquiry..."
                value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}/>
            </div>

            {formStatus==="success" && <div className="form-status success">✓ Message sent! We'll get back to you soon.</div>}
            {formStatus==="error"   && <div className="form-status error">✗ Something went wrong. Please email us directly.</div>}

            <button type="submit" className="btn-primary"
              disabled={formStatus==="sending"}
              style={{opacity:formStatus==="sending"?0.7:1}}>
              <span>{formStatus==="sending" ? "Sending…" : "Send Message →"}</span>
            </button>
          </form>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-left">
          <img src={LOGO_PATH} alt="Saptaashwa" className="footer-logo"/>
          <div className="footer-brand">SAPTAASHWA ENTERPRISES</div>
        </div>
        <div className="footer-tagline">Harnessing Strength, Delivering Success</div>
        <div style={{display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"}}>
          <a
            href={BROCHURE_PATH}
            download="Saptaashwa_Enterprises_Brochure.pdf"
            style={{
              display:"flex",alignItems:"center",gap:"6px",
              fontFamily:"var(--font-ui)",fontSize:".6rem",
              letterSpacing:".15em",textTransform:"uppercase",
              color:"var(--gold)",textDecoration:"none",
              transition:"opacity .3s",
            }}
            onMouseOver={e=>e.currentTarget.style.opacity=".7"}
            onMouseOut={e=>e.currentTarget.style.opacity="1"}
          >
            <DownloadIcon size={12}/> Brochure
          </a>
          <div className="footer-copy">© 2026 Saptaashwa Enterprises. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
