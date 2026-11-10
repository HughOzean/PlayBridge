"use client";

import { useEffect, useRef, useState } from "react";

const sections = ["experience", "how-it-works", "compatibility", "setup", "faq", "get-started"] as const;
type Section = (typeof sections)[number];

const labels = {
  en: ["The experience", "How it works", "Compatibility", "Setup", "FAQ", "Download APK"],
  zh: ["功能介绍", "连接原理", "兼容说明", "连接流程", "常见问题", "下载 APK"],
};

export default function Header({ locale }: { locale: "en" | "zh" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Section | "">("");
  const header = useRef<HTMLElement>(null);
  const pending = useRef<{ id: Section; until: number } | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const languageHash = active ? `#${active}` : "";

  useEffect(() => {
    let frame = 0;
    const previousOffset = document.documentElement.style.getPropertyValue("--header-offset");

    const update = () => {
      frame = 0;
      const offset = (header.current?.getBoundingClientRect().height || 74) + 20;
      document.documentElement.style.setProperty("--header-offset", `${offset}px`);
      const targets = sections.flatMap((id) => {
        const element = document.getElementById(id);
        return element ? [{ id, top: element.getBoundingClientRect().top }] : [];
      });
      const atBottom = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3;
      let current: Section | "" = "";
      for (const target of targets) {
        if (target.top <= offset + 2) current = target.id;
      }
      if (atBottom) current = "get-started";

      // Keep the clicked destination highlighted during native smooth scrolling.
      // Wheel/touch input cancels this short lock so manual scrolling always wins.
      if (pending.current) {
        const target = targets.find((item) => item.id === pending.current?.id);
        const arrived = target && Math.abs(target.top - offset) <= 4;
        if (arrived || atBottom || performance.now() >= pending.current.until) {
          pending.current = null;
        } else {
          current = pending.current.id;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const cancelPending = () => {
      pending.current = null;
      schedule();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancelPending();
    };
    const initialHash = window.location.hash.slice(1);
    if (sections.includes(initialHash as Section)) setActive(initialHash as Section);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    window.addEventListener("wheel", cancelPending, { passive: true });
    window.addEventListener("touchstart", cancelPending, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    const resizeObserver = new ResizeObserver(schedule);
    if (header.current) resizeObserver.observe(header.current);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("wheel", cancelPending);
      window.removeEventListener("touchstart", cancelPending);
      window.removeEventListener("keydown", onKeyDown);
      if (previousOffset) document.documentElement.style.setProperty("--header-offset", previousOffset);
      else document.documentElement.style.removeProperty("--header-offset");
    };
  }, []);

  const selectSection = (id: Section) => {
    setMenuOpen(false);
    setActive(id);
    pending.current = { id, until: performance.now() + 1800 };
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      pending.current = null;
      window.dispatchEvent(new Event("scroll"));
    }, 1850);
  };

  return <header className="site-header bilingual-header" ref={header}>
    <div className="container nav-bar">
      <a className="brand" href="#main" aria-label={locale === "zh" ? "PlayBridge 首页" : "PlayBridge home"} onClick={() => { pending.current = null; setMenuOpen(false); }}>
        <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M6 27V13a8 8 0 0 1 16 0v14M16 27V13a8 8 0 0 1 16 0v14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>
        <span>playbridge<span className="brand-dot">.</span></span>
      </a>
      <nav id="navigation" className={menuOpen ? "nav-links open" : "nav-links"} aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
        {sections.map((id, index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => selectSection(id)}>{labels[locale][index]}</a>)}
      </nav>
      <div className="header-controls">
        <div className="language-switch" role="group" aria-label={locale === "zh" ? "选择语言" : "Choose language"}>
          <a href={`${basePath}/${languageHash}`} hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined}>English</a>
          <a href={`${basePath}/zh/${languageHash}`} hrefLang="zh-CN" lang="zh-CN" aria-current={locale === "zh" ? "page" : undefined}>中文</a>
        </div>
        <button className="menu-toggle" aria-label={locale === "zh" ? (menuOpen ? "关闭导航" : "打开导航") : (menuOpen ? "Close navigation" : "Open navigation")} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{locale === "zh" ? (menuOpen ? "关闭 −" : "菜单 +") : (menuOpen ? "Close −" : "Menu +")}</button>
      </div>
    </div>
  </header>;
}
