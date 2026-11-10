"use client";

import Image from "next/image";
import { useState } from "react";
import release from "@/data/release.json";
import Header from "@/components/Header";

function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>; }
function Mark() { return <svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M6 27V13a8 8 0 0 1 16 0v14M16 27V13a8 8 0 0 1 16 0v14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg>; }
function Icon({ type }: { type: "connect" | "touch" | "sound" }) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{type === "connect" ? <><path d="M4 12a18 18 0 0 1 24 0M8 17a12 12 0 0 1 16 0M12 22a6 6 0 0 1 8 0"/><circle cx="16" cy="27" r="1"/></> : type === "touch" ? <><path d="M12 18V7a3 3 0 0 1 6 0v10l3-3a3 3 0 0 1 4 4l-6 10h-8L5 19a3 3 0 0 1 4-4l3 3Z"/><path d="M6 7a9 9 0 0 1 17-3"/></> : <><path d="M5 12h6l7-6v20l-7-6H5zM23 10a10 10 0 0 1 0 12M27 6a16 16 0 0 1 0 20"/></>}</svg>;
}


export default function Home({ locale = "en" }: { locale?: "en" | "zh" }) {
  const t = (zh: string, en: string) => locale === "zh" ? zh : en;
  const faqs = [
    [t("PlayBridge 是什么？", "What is PlayBridge?"), t("PlayBridge 是一款实验性 Android 应用。当前原型旨在将手机车载界面的画面和声音转发至无线 CarPlay 车机或兼容的 Windows 接收端，并将触摸操作回传至手机。", "PlayBridge is an experimental Android app. The current prototype is designed to forward a phone’s car-interface video and audio to a wireless CarPlay head unit or a compatible Windows receiver, with touch input sent back to the phone.")],
    [t("它和 CarPlay、Android Auto 一样吗？", "Is it the same as CarPlay or Android Auto?"), t("不一样。PlayBridge 是独立的桥接应用，并非 Apple 或 Google 的产品。Android Auto、Android Automotive OS 和 Android 车机属于不同环境，支持其中一种并不代表支持其他环境。", "No. PlayBridge is a separate bridge app, not an Apple or Google product. Android Auto, Android Automotive OS and Android head units are different environments. Support for one does not imply support for the others.")],
    [t("支持哪些手机和车机？", "Which phones and head units are supported?"), t("目前还没有经过验证的兼容设备清单。开发者曾描述原型具备 Android Auto 检测能力，并提及与 CarWith、OPPO Car+ 及部分 CarLife 组件的兼容情况。这些是原型能力描述，并非针对所有手机或车辆的测试结论。", "A verified compatibility list is not available yet. The developer has reported Android Auto detection and compatibility with CarWith, OPPO Car+ and some CarLife components. These are prototype descriptions, not confirmed results for every phone or vehicle.")],
    [t("现在可以下载 APK 吗？", "Can I download the APK?"), t(`可以。在下方下载区可获取托管于 GitHub Releases 的 PlayBridge ${release.version}。安装前请核对 Android 版本要求、处理器架构和 SHA-256。当前版本仍属实验阶段，可下载并不代表兼容你的手机或接收端。`, `Yes. PlayBridge ${release.version} is available from the download section below, hosted on GitHub Releases. Check the Android requirement, architecture and SHA-256 before installing. This is an experimental build; a download does not mean your phone or receiver is supported.`)],
    [t("PlayBridge 开源了吗？", "Is PlayBridge open source?"), t("目前公开提供的是 APK 安装包，这不代表 Android 应用已经开源。本网站尚未确认 Android 应用源码仓库及其开源许可证。", "The APK is publicly available as a binary release. That does not establish an open-source release of the Android app. An Android app source repository and license have not been confirmed on this website.")],
  ];
  const [receiver, setReceiver] = useState<"car" | "windows">("car");
  return <>
    <a className="skip-link" href="#main">{t("跳转到正文", "Skip to content")}</a>
    <Header locale={locale} />
    <main id="main">
      <section className="hero container">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" />{t(" 一座小桥，连接更多可能", " A LITTLE BRIDGE. MORE POSSIBILITIES.")}</div><h1>{t("熟悉的车载界面，", "A familiar drive.")}<br />{t("连接", "A new ")}<em>{t("新的屏幕。", "connection.")}</em></h1><p className="hero-description">{t("把手机上的车载界面带到另一块屏幕。PlayBridge 尝试在 Android 手机与兼容的接收端之间，搭起一座连接的桥。", "Your phone’s car interface, on a different screen. Meet the experimental bridge between your Android phone and your next connection.")}</p><div className="hero-actions"><a className="button primary" href="#how-it-works">{t("了解连接原理 ", "See how it works ")}<Arrow /></a><a className="text-link" href="#get-started">{t("获取 APK ", "Get the APK ")}<span aria-hidden="true">↓</span></a></div><div className="hero-note"><span className="tiny-bridge">↔</span>{t(" Android 手机 ", " Android phone ")}<span className="note-divider" />{t(" 无线 CarPlay 车机或 Windows 接收端", " Wireless CarPlay head unit or Windows receiver")}</div></div>
        <figure className="hero-photo">
          <div className="hero-photo-frame">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/playbridge-parked-scene.webp`}
              alt={t("AI 生成的停车场景图：车内中控屏与支架上的 Android 手机，窗外为林地。此图并非 PlayBridge 产品截图，也不代表设备兼容性已验证。", "AI-generated scene of a parked car interior with a dashboard display and mounted Android-style phone, overlooking woodland. Not a PlayBridge product screenshot or evidence of device compatibility.")}
              fill
              sizes="(max-width: 500px) calc(100vw - 40px), (max-width: 600px) 460px, (max-width: 1150px) calc((100vw - 76px) / 2), (max-width: 1352px) calc((100vw - 138px) / 2), 607px"
              priority
              className="hero-photo-image"
            />
            <div className="hero-photo-shade" aria-hidden="true" />
            <span className="hero-photo-tag"><span aria-hidden="true" />{t(" 想象下一次连接", " THE POSSIBILITY, PICTURED")}</span>
            <div className="hero-photo-message"><span>{t("一部手机，另一种视野。", "One phone. A wider view.")}</span><span aria-hidden="true">↗</span></div>
          </div>
          <figcaption className="hero-photo-caption">
            <span className="hero-photo-caption-icon" aria-hidden="true">✳</span>
            <div><strong>{t("让连接的想法，有一个画面。", "A scene to imagine the connection.")}</strong><span>{t("AI 生成场景图 · 非产品截图", "AI-generated scene · Not a product screenshot")}</span></div>
          </figcaption>
        </figure>
      </section>
      <div className="ecosystem container"><span>{t("连接的两端", "DESIGNED TO BRIDGE")}</span><div>Android <small>{t("手机", "phone")}</small></div><span className="ecosystem-plus">+</span><div>{t("无线 CarPlay ", "Wireless CarPlay ")}<small>{t("车机", "head unit")}</small></div><span className="ecosystem-or">{t("或", "or")}</span><div>Windows <small>{t("兼容接收端", "compatible receiver")}</small></div><span className="ecosystem-status">{t("早期原型 ", "Early prototype ")}<span>↗</span></span></div>
      <section id="experience" className="section container experience"><div className="section-heading"><div><div className="eyebrow">{t("01 / 产品想法", "01 / THE IDEA")}</div><h2>{t("让手机与屏幕，", "Less between you")}<br/>{t("靠近一点。", "and your next screen.")}</h2></div><p>{t("一个专注的想法：将手机车载界面的体验，传递到兼容的接收端。", "One focused idea: carry the phone’s car-interface experience across to a compatible receiver.")}</p></div><div className="feature-grid"><article className="feature"><div className="feature-icon"><Icon type="connect"/></div><span className="feature-number">01</span><h3>{t("连接另一块屏幕。", "Bridge the connection.")}</h3><p>{t("旨在将手机车载界面的画面转发至无线 CarPlay 车机或兼容的 Windows 接收端。", "Designed to forward your phone’s car-interface video to a wireless CarPlay head unit or compatible Windows receiver.")}</p><span className="feature-tag">{t("手机 → 接收端", "PHONE → RECEIVER")}</span></article><article className="feature"><div className="feature-icon"><Icon type="touch"/></div><span className="feature-number">02</span><h3>{t("让操作双向传递。", "A two-way conversation.")}</h3><p>{t("原型包含触摸输入回传能力，让接收端上受支持的操作可以传回手机。", "The prototype includes touch input forwarding, so supported receiver interactions can travel back to the phone.")}</p><span className="feature-tag">{t("触摸操作回传", "TOUCH INPUT RETURN")}</span></article><article className="feature"><div className="feature-icon"><Icon type="sound"/></div><span className="feature-number">03</span><h3>{t("画面与声音，一起传递。", "Picture. Sound. Together.")}</h3><p>{t("当前原型包含视频和音频转发能力，应用内提供连接与权限设置指引。", "Video and audio forwarding are part of the current prototype, with connection and permission guidance in the app.")}</p><span className="feature-tag">{t("画面 + 声音", "VIDEO + AUDIO")}</span></article></div><p className="section-footnote">{t("以上为开发者描述的原型能力，具体设备的兼容性仍需逐一验证。", "Prototype capabilities described by the developer. Device-by-device compatibility is still to be verified.")}</p></section>
      <section id="how-it-works" className="how-section"><div className="container how-layout"><div className="how-copy"><div className="eyebrow">{t("02 / 连接原理", "02 / THE CONNECTION")}</div><h2>{t("一座小桥，", "A small bridge.")}<br/>{t("一个简单的想法。", "A simple idea.")}</h2><p>{t("PlayBridge 连接 Android 手机的车载界面与兼容的接收端。", "PlayBridge sits between your Android phone’s car interface and a compatible receiver.")}</p><div className="receiver-switch" role="group" aria-label={t("选择接收端示意", "Choose receiver concept")}><button aria-pressed={receiver === "car"} onClick={() => setReceiver("car")}>{t("车机屏幕", "Car display")}</button><button aria-pressed={receiver === "windows"} onClick={() => setReceiver("windows")}>{t("Windows 接收端", "Windows receiver")}</button></div><p className="switch-note" aria-live="polite">{receiver === "car" ? t("查看无线 CarPlay 车机的连接示意。", "Explore the wireless CarPlay head-unit connection concept.") : t("查看兼容 Windows 接收端的连接示意。接收软件的具体要求尚待确认。", "Explore the compatible Windows receiver connection concept. Receiver software requirements are not confirmed yet.")}</p></div><div className="connection-flow"><div className="flow-devices"><div className="flow-endpoint"><span className="device-outline phone-outline"/><strong>{t("Android 手机", "Android phone")}</strong><small>{t("手机车载界面", "Your car interface")}</small></div><div className="flow-line"><span>→</span></div><div className="flow-bridge"><Mark/><strong>PlayBridge</strong><small>{t("连接桥梁", "The bridge")}</small></div><div className="flow-line"><span>→</span></div><div className="flow-endpoint"><span className={receiver === "car" ? "device-outline screen-outline" : "device-outline laptop-outline"}/><strong>{receiver === "car" ? t("车机屏幕", "Car display") : "Windows"}</strong><small>{receiver === "car" ? t("无线 CarPlay 接收端", "Wireless CarPlay receiver") : t("兼容接收端", "Compatible receiver")}</small></div></div><div className="flow-return"><span>←</span>{t(" 触摸操作回传至手机", " Touch input travels back to your phone")}</div><div className="flow-note"><span>i</span>{t(" 仅为连接示意，实际设置取决于手机和接收端。", " Connection diagram only. Actual setup depends on the phone and receiver.")}</div></div></div></section>
      <section id="compatibility" className="section container compatibility"><div className="compat-copy"><div className="eyebrow">{t("03 / 连接前须知", "03 / BEFORE YOU CONNECT")}</div><h2>{t("连接之前，", "The right setup")}<br/>{t("先了解设备要求。", "comes first.")}</h2><p>{t("一部手机，一个接收端。开始之前，先看看目前已知的要求与限制。", "A phone, a receiver, and a little clarity. Here’s what we know about the prototype so far.")}</p><a href="#faq" className="text-link">{t("查看常见问题 ", "A few more answers ")}<Arrow/></a></div><div className="compat-table"><div className="compat-table-header"><span>{t("设备与环境", "THE ESSENTIALS")}</span><span>{t("当前状态", "CURRENT STATUS")}</span></div>{[[t("Android 手机", "Android phone"), t("手机端应用", "Phone-side app"), t(`${release.androidVersion} 及以上；接收端兼容性仍需测试`, `${release.androidVersion} or later; receiver support requires testing`)],[t("车载界面", "Car interface"), t("自动检测", "Automatic detection"), t("优先检测 Android Auto，其他组件仍需测试", "Android Auto first; other components require testing")],[t("无线 CarPlay 车机", "Wireless CarPlay head unit"), t("目标接收端", "Intended receiver"), t("车辆与车机兼容性尚未验证", "Vehicle and head-unit compatibility not yet verified")],[t("Windows 接收端", "Windows receiver"), t("备选接收端", "Alternative receiver"), t("兼容接收端及设置细节尚待确认", "Compatible receiver and setup details to be confirmed")]].map(([name, status, detail])=><div className="compat-row" key={name}><div><h3>{name}</h3><p>{detail}</p></div><span className="status-pill">{status}</span></div>)}<div className="compat-bottom">{t("兼容情况取决于具体设备组合，不代表支持所有车辆。", "Support is specific to each setup. No universal vehicle compatibility is claimed.")}</div></div></section>
      <section id="setup" className="setup-section container"><div className="section-heading"><div><div className="eyebrow">{t("04 / 连接流程", "04 / CONNECTION STEPS")}</div><h2>{t("了解步骤，", "Know the path.")}<br/>{t("再开始连接。", "Before you start.")}</h2></div><p>{t("先了解大致设置流程。针对具体设备的详细指引，将在测试后补充。", "A preview of the setup journey. Detailed device-specific instructions will follow testing.")}</p></div><div className="steps">{[[t("核对设备要求", "Check your setup"), t("确认手机的车载界面组件，以及接收端的具体要求。", "Confirm your phone’s car-interface components and the receiver’s requirements.")],[t("跟随应用指引", "Follow the app guidance"), t("原型内提供蓝牙、Wi-Fi、权限与后台运行的设置指引。", "The prototype includes Bluetooth, Wi-Fi, permission and background-running guidance.")],[t("停车后连接测试", "Connect while parked"), t("检查画面、声音与触摸响应。如遇异常，请记录具体设备和设置情况。", "Check picture, sound and touch response. Record your exact device setup if anything fails.")]].map(([title, body], i)=><article key={title}><span className="step-index">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section id="faq" className="faq-section container"><div><div className="eyebrow">{t("05 / 常见问题", "05 / GOOD TO KNOW")}</div><h2>{t("常见疑问，", "A few questions.")}<br/>{t("逐一说明。", "Clear answers.")}</h2><p>{t("说明已知信息，", "Start with what’s known.")}<br/>{t("也保留尚待验证的部分。", "Keep the unknowns in view.")}</p></div><div className="faq-list">{faqs.map(([question, answer])=><details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section id="get-started" className="download-section container" aria-labelledby="download-heading">
        <div className="download-copy">
          <div className="eyebrow">{t("开启下一次连接", "THE NEXT CONNECTION")}</div>
          <h2 id="download-heading">{t("下载", "Download")}<br/>{t("PlayBridge。", "PlayBridge.")}</h2>
          <p>{t("下载实验版本，探索连接的可能。安装前请先核对手机与接收端要求。", "An experimental build, ready to explore. Check your phone and receiver requirements before installing.")}</p>
          <p className="download-parked-note">{t("请仅在安全停车后设置和测试。设备与车辆兼容性仍有待验证。", "Set up and test only while safely parked. Device and vehicle compatibility is still to be verified.")}</p>
        </div>
        <div className="release-area">
          <div className="release-heading"><span className="release-label">{t("Android 安装包", "ANDROID APK")}</span><span className="release-stage">{t("实验版本", "Experimental")}</span></div>
          <h3 className="release-version">PlayBridge <span>{release.version}</span></h3>
          <p className="release-specs">{release.androidVersion}{t(" 及以上", "+")} <span aria-hidden="true">·</span> {release.architecture} <span aria-hidden="true">·</span> {release.sizeLabel}</p>
          <a className="button release-download" href={release.downloadUrl} aria-label={t(`下载适用于 ${release.architecture} 的 PlayBridge ${release.version} APK`, `Download PlayBridge ${release.version} APK for ${release.architecture}`)}>
            {t("下载 APK", "Download APK")} <span aria-hidden="true">↓</span>
          </a>
          <p className="release-install-note">{t("将 APK 下载到 Android 手机后打开。系统可能会提示你允许从当前浏览器安装应用。", "Download to your Android phone, then open the APK. Android may ask you to allow installs from this browser.")}</p>
          <div className="release-links"><span>{t("托管于 GitHub Releases", "Hosted on GitHub Releases")}</span><a href={release.releaseUrl}>{t("版本详情 ", "Release details ")}<Arrow /></a></div>
          <details className="release-verification">
            <summary>{t("文件信息与校验值 ", "File details & checksum ")}<span aria-hidden="true">+</span></summary>
            <dl>
              <div><dt>{t("包名", "Package")}</dt><dd>{release.packageName}</dd></div>
              <div><dt>{t("版本代码", "Version code")}</dt><dd>{release.versionCode}</dd></div>
              <div><dt>{t("最低 SDK", "Minimum SDK")}</dt><dd>{release.minSdk}</dd></div>
              <div><dt>{t("文件大小", "File size")}</dt><dd>{release.sizeBytes.toLocaleString(t("zh-CN", "en-US"))}{t(" 字节", " bytes")}</dd></div>
            </dl>
            <div className="release-checksum"><strong>SHA-256</strong><code>{release.sha256}</code></div>
            <a className="release-checksum-link" href={release.checksumUrl}>{t("下载校验文件 ", "Download checksum file ")}<Arrow /></a>
          </details>
        </div>
        <div className="download-decoration" aria-hidden="true">↗</div>
      </section>
    </main>
    <footer className="container footer"><div className="footer-top"><a href="#" className="brand"><Mark/><span>playbridge<span className="brand-dot">.</span></span></a><span>{t("一座小桥，一次新的连接。", "A little bridge. A new connection.")}</span><a href="#main" className="text-link">{t("返回顶部 ↑", "Back to top ↑")}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PlayBridge</span><p>{t("独立开发的实验性软件，与 Apple、Google 或汽车厂商无关联。文中产品名称归各自权利人所有。", "Independent experimental software. Not affiliated with Apple, Google or vehicle manufacturers. Product names belong to their respective owners.")}</p><span>{t("请在安全停车后设置与测试。", "Designed for parked setup & testing.")}</span></div></footer>
  </>;
}
