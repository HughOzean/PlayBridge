"use client";

import Image from "next/image";
import { useState } from "react";
import release from "@/data/release.json";

function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>; }
function Mark() { return <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M6 27V13a8 8 0 0 1 16 0v14M16 27V13a8 8 0 0 1 16 0v14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>; }
function Icon({ type }: { type: "connect" | "touch" | "sound" }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{type === "connect" ? <><path d="M4 12a18 18 0 0 1 24 0M8 17a12 12 0 0 1 16 0M12 22a6 6 0 0 1 8 0"/><circle cx="16" cy="27" r="1"/></> : type === "touch" ? <><path d="M12 18V7a3 3 0 0 1 6 0v10l3-3a3 3 0 0 1 4 4l-6 10h-8L5 19a3 3 0 0 1 4-4l3 3Z"/><path d="M6 7a9 9 0 0 1 17-3"/></> : <><path d="M5 12h6l7-6v20l-7-6H5zM23 10a10 10 0 0 1 0 12M27 6a16 16 0 0 1 0 20"/></>}</svg>;
}
const faqs = [
  ["PlayBridge 是什么？", "PlayBridge 是一款实验性 Android 应用。当前原型旨在将手机车载界面的画面和声音转发至无线 CarPlay 车机或兼容的 Windows 接收端，并将触摸操作回传至手机。"],
  ["它和 CarPlay、Android Auto 一样吗？", "不一样。PlayBridge 是独立的桥接应用，并非 Apple 或 Google 的产品。Android Auto、Android Automotive OS 和 Android 车机属于不同环境，支持其中一种并不代表支持其他环境。"],
  ["支持哪些手机和车机？", "目前还没有经过验证的兼容设备清单。开发者曾描述原型具备 Android Auto 检测能力，并提及与 CarWith、OPPO Car+ 及部分 CarLife 组件的兼容情况。这些是原型能力描述，并非针对所有手机或车辆的测试结论。"],
  ["现在可以下载 APK 吗？", `可以。在下方下载区可获取托管于 GitHub Releases 的 PlayBridge ${release.version}。安装前请核对 Android 版本要求、处理器架构和 SHA-256。当前版本仍属实验阶段，可下载并不代表兼容你的手机或接收端。`],
  ["PlayBridge 开源了吗？", "目前公开提供的是 APK 安装包，这不代表 Android 应用已经开源。本网站尚未确认 Android 应用源码仓库及其开源许可证。"],
  ["做过实车测试吗？", "开发者于 2026 年 11 月 5 日表示，当时尚未进行实车测试。兼容性信息需要随后续测试结果更新。请仅在安全停车后设置和测试。"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [receiver, setReceiver] = useState<"car" | "windows">("car");
  return <>
    <a className="skip-link" href="#main">跳转到正文</a>
    <header className="site-header"><div className="container nav-bar">
      <a className="brand" href="#" aria-label="PlayBridge 首页"><Mark /><span>playbridge<span className="brand-dot">.</span></span></a>
      <button className="menu-toggle" aria-label={menuOpen ? "关闭导航" : "打开导航"} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "关闭 −" : "菜单 +"}</button>
      <nav id="navigation" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="主导航">
        <a onClick={() => setMenuOpen(false)} href="#experience">功能介绍</a><a onClick={() => setMenuOpen(false)} href="#how-it-works">连接原理</a><a onClick={() => setMenuOpen(false)} href="#compatibility">兼容说明</a><a onClick={() => setMenuOpen(false)} href="#faq">常见问题</a><a className="nav-download" onClick={() => setMenuOpen(false)} href="#get-started">下载 APK</a>
      </nav><a className="nav-cta" href="#get-started">下载 APK <Arrow /></a>
    </div></header>
    <main id="main">
      <section className="hero container">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> 一座小桥，连接更多可能</div><h1>熟悉的车载界面，<br />连接<em>新的屏幕。</em></h1><p className="hero-description">把手机上的车载界面带到另一块屏幕。PlayBridge 尝试在 Android 手机与兼容的接收端之间，搭起一座连接的桥。</p><div className="hero-actions"><a className="button primary" href="#how-it-works">了解连接原理 <Arrow /></a><a className="text-link" href="#get-started">获取 APK <span aria-hidden="true">↓</span></a></div><div className="hero-note"><span className="tiny-bridge">↔</span> Android 手机 <span className="note-divider" /> 无线 CarPlay 车机或 Windows 接收端</div></div>
        <figure className="hero-photo">
          <div className="hero-photo-frame">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/playbridge-parked-scene.webp`}
              alt="AI 生成的停车场景图：车内中控屏与支架上的 Android 手机，窗外为林地。此图并非 PlayBridge 产品截图，也不代表设备兼容性已验证。"
              fill
              sizes="(max-width: 500px) calc(100vw - 40px), (max-width: 600px) 460px, (max-width: 1150px) calc((100vw - 76px) / 2), (max-width: 1352px) calc((100vw - 138px) / 2), 607px"
              priority
              className="hero-photo-image"
            />
            <div className="hero-photo-shade" aria-hidden="true" />
            <span className="hero-photo-tag"><span aria-hidden="true" /> 想象下一次连接</span>
            <div className="hero-photo-message"><span>一部手机，另一种视野。</span><span aria-hidden="true">↗</span></div>
          </div>
          <figcaption className="hero-photo-caption">
            <span className="hero-photo-caption-icon" aria-hidden="true">✳</span>
            <div><strong>让连接的想法，有一个画面。</strong><span>AI 生成场景图 · 非产品截图</span></div>
          </figcaption>
        </figure>
      </section>
      <div className="ecosystem container"><span>连接的两端</span><div>Android <small>手机</small></div><span className="ecosystem-plus">+</span><div>无线 CarPlay <small>车机</small></div><span className="ecosystem-or">或</span><div>Windows <small>兼容接收端</small></div><span className="ecosystem-status">早期原型 <span>↗</span></span></div>
      <section id="experience" className="section container experience"><div className="section-heading"><div><div className="eyebrow">01 / 产品想法</div><h2>让手机与屏幕，<br/>靠近一点。</h2></div><p>一个专注的想法：将手机车载界面的体验，传递到兼容的接收端。</p></div><div className="feature-grid"><article className="feature"><div className="feature-icon"><Icon type="connect"/></div><span className="feature-number">01</span><h3>连接另一块屏幕。</h3><p>旨在将手机车载界面的画面转发至无线 CarPlay 车机或兼容的 Windows 接收端。</p><span className="feature-tag">手机 → 接收端</span></article><article className="feature"><div className="feature-icon"><Icon type="touch"/></div><span className="feature-number">02</span><h3>让操作双向传递。</h3><p>原型包含触摸输入回传能力，让接收端上受支持的操作可以传回手机。</p><span className="feature-tag">触摸操作回传</span></article><article className="feature"><div className="feature-icon"><Icon type="sound"/></div><span className="feature-number">03</span><h3>画面与声音，一起传递。</h3><p>当前原型包含视频和音频转发能力，应用内提供连接与权限设置指引。</p><span className="feature-tag">画面 + 声音</span></article></div><p className="section-footnote">以上为开发者描述的原型能力，具体设备的兼容性仍需逐一验证。</p></section>
      <section id="how-it-works" className="how-section"><div className="container how-layout"><div className="how-copy"><div className="eyebrow">02 / 连接原理</div><h2>一座小桥，<br/>一个简单的想法。</h2><p>PlayBridge 连接 Android 手机的车载界面与兼容的接收端。</p><div className="receiver-switch" role="group" aria-label="选择接收端示意"><button aria-pressed={receiver === "car"} onClick={() => setReceiver("car")}>车机屏幕</button><button aria-pressed={receiver === "windows"} onClick={() => setReceiver("windows")}>Windows 接收端</button></div><p className="switch-note" aria-live="polite">{receiver === "car" ? "查看无线 CarPlay 车机的连接示意。" : "查看兼容 Windows 接收端的连接示意。接收软件的具体要求尚待确认。"}</p></div><div className="connection-flow"><div className="flow-devices"><div className="flow-endpoint"><span className="device-outline phone-outline"/><strong>Android 手机</strong><small>手机车载界面</small></div><div className="flow-line"><span>→</span></div><div className="flow-bridge"><Mark/><strong>PlayBridge</strong><small>连接桥梁</small></div><div className="flow-line"><span>→</span></div><div className="flow-endpoint"><span className={receiver === "car" ? "device-outline screen-outline" : "device-outline laptop-outline"}/><strong>{receiver === "car" ? "车机屏幕" : "Windows"}</strong><small>{receiver === "car" ? "无线 CarPlay 接收端" : "兼容接收端"}</small></div></div><div className="flow-return"><span>←</span> 触摸操作回传至手机</div><div className="flow-note"><span>i</span> 仅为连接示意，实际设置取决于手机和接收端。</div></div></div></section>
      <section id="compatibility" className="section container compatibility"><div className="compat-copy"><div className="eyebrow">03 / 连接前须知</div><h2>连接之前，<br/>先了解设备要求。</h2><p>一部手机，一个接收端。开始之前，先看看目前已知的要求与限制。</p><a href="#faq" className="text-link">查看常见问题 <Arrow/></a><div className="test-notice"><span className="notice-icon">i</span><div><strong>仍在起步，保留真实预期。</strong><p>开发者于 2026 年 11 月 5 日表示，当时尚未进行实车测试。</p></div></div></div><div className="compat-table"><div className="compat-table-header"><span>设备与环境</span><span>当前状态</span></div>{[["Android 手机", "手机端应用", `${release.androidVersion} 及以上；接收端兼容性仍需测试`],["车载界面", "自动检测", "优先检测 Android Auto，其他组件仍需测试"],["无线 CarPlay 车机", "目标接收端", "车辆与车机兼容性尚未验证"],["Windows 接收端", "备选接收端", "兼容接收端及设置细节尚待确认"]].map(([name, status, detail])=><div className="compat-row" key={name}><div><h3>{name}</h3><p>{detail}</p></div><span className="status-pill">{status}</span></div>)}<div className="compat-bottom">兼容情况取决于具体设备组合，不代表支持所有车辆。</div></div></section>
      <section className="setup-section container"><div className="section-heading"><div><div className="eyebrow">04 / 开始之前</div><h2>了解步骤，<br/>再开始连接。</h2></div><p>先了解大致设置流程。针对具体设备的详细指引，将在测试后补充。</p></div><div className="steps">{[["核对设备要求", "确认手机的车载界面组件，以及接收端的具体要求。"],["跟随应用指引", "原型内提供蓝牙、Wi-Fi、权限与后台运行的设置指引。"],["停车后连接测试", "检查画面、声音与触摸响应。如遇异常，请记录具体设备和设置情况。"]].map(([title, body], i)=><article key={title}><span className="step-index">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section id="faq" className="faq-section container"><div><div className="eyebrow">05 / 常见问题</div><h2>常见疑问，<br/>逐一说明。</h2><p>说明已知信息，<br/>也保留尚待验证的部分。</p></div><div className="faq-list">{faqs.map(([question, answer])=><details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section id="get-started" className="download-section container" aria-labelledby="download-heading">
        <div className="download-copy">
          <div className="eyebrow">开启下一次连接</div>
          <h2 id="download-heading">下载<br/>PlayBridge。</h2>
          <p>下载实验版本，探索连接的可能。安装前请先核对手机与接收端要求。</p>
          <p className="download-parked-note">请仅在安全停车后设置和测试。设备与车辆兼容性仍有待验证。</p>
        </div>
        <div className="release-area">
          <div className="release-heading"><span className="release-label">Android 安装包</span><span className="release-stage">实验版本</span></div>
          <h3 className="release-version">PlayBridge <span>{release.version}</span></h3>
          <p className="release-specs">{release.androidVersion} 及以上 <span aria-hidden="true">·</span> {release.architecture} <span aria-hidden="true">·</span> {release.sizeLabel}</p>
          <a className="button release-download" href={release.downloadUrl} aria-label={`下载适用于 ${release.architecture} 的 PlayBridge ${release.version} APK`}>
            下载 APK <span aria-hidden="true">↓</span>
          </a>
          <p className="release-install-note">将 APK 下载到 Android 手机后打开。系统可能会提示你允许从当前浏览器安装应用。</p>
          <div className="release-links"><span>托管于 GitHub Releases</span><a href={release.releaseUrl}>版本详情 <Arrow /></a></div>
          <details className="release-verification">
            <summary>文件信息与校验值 <span aria-hidden="true">+</span></summary>
            <dl>
              <div><dt>包名</dt><dd>{release.packageName}</dd></div>
              <div><dt>版本代码</dt><dd>{release.versionCode}</dd></div>
              <div><dt>最低 SDK</dt><dd>{release.minSdk}</dd></div>
              <div><dt>文件大小</dt><dd>{release.sizeBytes.toLocaleString("zh-CN")} 字节</dd></div>
            </dl>
            <div className="release-checksum"><strong>SHA-256</strong><code>{release.sha256}</code></div>
            <a className="release-checksum-link" href={release.checksumUrl}>下载校验文件 <Arrow /></a>
          </details>
        </div>
        <div className="download-decoration" aria-hidden="true">↗</div>
      </section>
    </main>
    <footer className="container footer"><div className="footer-top"><a href="#" className="brand"><Mark/><span>playbridge<span className="brand-dot">.</span></span></a><span>一座小桥，一次新的连接。</span><a href="#main" className="text-link">返回顶部 ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PlayBridge</span><p>独立开发的实验性软件，与 Apple、Google 或汽车厂商无关联。文中产品名称归各自权利人所有。</p><span>请在安全停车后设置与测试。</span></div></footer>
  </>;
}
