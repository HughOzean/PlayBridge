# AGENTS.md — PlayBridge 项目协作规范

适用于本目录及子目录。先阅读 `README.md` 和本次任务涉及的源码，再实施修改。用户当前指令优先；遇到更深层的 `AGENTS.md`，同时遵循其适用范围内的要求。

## 1. 项目定位与事实边界

- 本仓库是 PlayBridge 的简体中文产品落地页，不包含 Android 应用或 Windows 接收端实现。
- PlayBridge 当前被描述为实验性 Android 桥接应用：设计目标是把手机车载界面的视频、音频转发到无线 CarPlay 车机或兼容的 Windows 接收端，并回传触摸输入。
- 原型能力描述不等于经过验证的兼容性结果。区分 Android Auto、Android Automotive OS 和 Android 车机，不得混为一谈。
- 页面记录的是开发者于 **2026-11-05** 报告尚未进行实车测试的历史状态。只有取得新的测试证据后，才能更新该状态；不得将旧日期改成今天以暗示重新验证。
- 用户已提供 `PlayBridge-0.2.9-arm64-release.apk` 并授权上传分发。二进制托管于 GitHub Releases，发布元数据在 `src/data/release.json`，核验记录在 `docs/releases/`；文件名不能作为版本、架构、签名或兼容性已验证的依据。
- 下载区只连接实际上传并核验的版本化资源，更新时同步元数据、校验文件与 FAQ，不创建假下载、虚构源码链接或无后端的注册表单。
- CSS/SVG 设备画面是概念插图，必须保留“非产品截图”的可见说明及可访问描述。
- 未确认正式域名、托管平台、CDN、GSC 数据及生产部署配置。涉及这些信息时标记：`ASSUMPTION — requires verification`。
- 不把 Apple、Google 或汽车厂商描述为合作方；保留独立软件、商标归属及停车设置与测试提示。

## 2. 技术栈与目录职责

当前版本以 `package.json` 和 `package-lock.json` 为准：Next.js 15.5.26、React 19、TypeScript strict、Tailwind CSS 4，使用 npm。

| 路径 | 职责 |
| --- | --- |
| `src/app/page.tsx` | 首页路由，渲染 `Home` |
| `src/app/layout.tsx` | 根布局、简体中文文档语言、Metadata、草稿 robots 指令和图标 |
| `src/components/Home.tsx` | 页面文案、概念插图、移动导航、接收端切换、FAQ、APK 下载区 |
| `src/data/release.json` | 经核验的 APK 版本、要求、大小、SHA-256 及固定版本下载链接 |
| `docs/releases/` | 二进制核验记录、发布说明及校验文件 |
| `src/app/globals.css` | Tailwind 导入、主题变量、全局样式和响应式布局 |
| `public/icon.svg` | 站点图标 |
| `next.config.ts` | 静态导出、构建时 basePath、关闭运行时图片优化及 `poweredByHeader` |
| `.github/workflows/pages.yml` | 手动触发的 GitHub Pages 构建与部署 |
| `scripts/preview.mjs` | 本地静态预览，支持匹配构建路径的 `--base-path` |
| `postcss.config.mjs` | Tailwind PostCSS 插件 |
| `.env.example` | 可选构建前缀 `NEXT_PUBLIC_BASE_PATH`；根路径开发无需环境变量 |
| `README.md` | 启动方式、内容边界、发布前要求及已有验证记录 |

- `@/*` 指向 `src/*`。
- 根布局与路由保留服务端组件边界；`Home.tsx` 当前是使用 `useState` 的客户端组件。
- 现有生产构建记录显示首页可静态生成。修改后应重新检查构建输出，不因存在 `"use client"` 就断言页面仅支持 CSR。
- 不手工修改 `node_modules/`、`.next/`、`next-env.d.ts` 或 `*.tsbuildinfo` 等依赖或生成文件。

## 3. 本地开发与验证命令

在项目根目录执行：

```bash
# 首次安装或需要按锁文件恢复依赖时
npm ci

# 本地开发；默认沿用 README 的端口并仅监听回环地址
npm run dev -- --hostname 127.0.0.1 --port 3101

# TypeScript 检查与生产构建，依次执行
npm run typecheck
npm run build

# 构建成功后预览 out/ 静态文件（不使用 next start）
npm start -- --hostname 127.0.0.1 --port 3101

# 验证 GitHub Pages 项目子路径
NEXT_PUBLIC_BASE_PATH=/PlayBridge npm run build
npm start -- --base-path /PlayBridge --port 3101
```

- 不覆盖或终止不属于当前任务的已有服务；端口被占用时选用空闲端口并说明。
- 当前没有 `lint`、`test` 脚本或自动化浏览器测试框架，不编造对应检查通过的结论。
- 仅修改文档时核对路径、命令与源码即可；修改源码、样式、配置或依赖时执行类型检查和生产构建。
- 构建会生成 `.next/types`，不并发运行依赖该目录的检查与构建。
- `output: "export"` 生成 `out/`。GitHub Pages 无 Next.js 服务端，不引入依赖动态请求的服务端功能或默认图片优化接口。public 图片和图标须显式使用与 `basePath` 一致的构建时前缀。
- Pages 工作流通过 `configure-pages` 读取真实部署路径，保持手动触发，除非用户要求自动发布。未验证账户套餐前，不声称私有仓库已可部署；不要自行公开仓库。
- 浏览器验收需实际操作；静态检查和截图文件的存在不能替代交互验证。不可用时明确记录未验证项。

## 4. 实施约定

- 默认端到端执行：检查上下文、最小范围修改、验证、交付。可从源码推断的信息不要反复询问。
- 与用户沟通默认使用中文；网站默认文案、Metadata、`lang="zh-CN"` 和可访问名称保持简体中文。品牌名和技术标识（如 Android、CarPlay、SHA-256）保留原名，除非任务明确要求其他语言。
- 保持现有浅色纸面背景、深绿色与青柠点缀、衬线强调文字及 CSS/SVG 插图语言；沿用 `globals.css` 主题变量。
- 沿用现有组件和样式组织；按实际复杂度拆分组件，不为简单展示页引入状态管理、UI 库、远程字体或新服务。
- 新增客户端组件只用于确有交互需求的部分。Metadata 继续使用 Next.js 的服务端元数据接口。
- 使用严格类型，不通过关闭类型检查、忽略构建错误或大范围使用 `any` 来绕过问题。
- 新增依赖时说明必要性，并通过 npm 同步锁文件；不无关升级框架或替换包管理器。
- 不复制其他项目的密钥、追踪代码、业务内容或部署配置。README 中引用的 AirMirror 路径仅是技术栈背景，不是本项目运行依赖。
- 用户未要求时，不添加分析追踪、数据收集、CMS、API 后端或对外发布操作。

## 5. 页面与可访问性验收

涉及页面的变更按实际影响检查：

- 首页 HTTP 状态正常，主要文案在初始 HTML 中可见，浏览器控制台没有新增错误。
- 保持一个清晰的 H1、合理的标题层级及有效的导航锚点；当前主要锚点为 `main`、`experience`、`how-it-works`、`compatibility`、`faq`、`get-started`。
- 移动菜单可展开和关闭，点击导航后关闭，`aria-expanded` 与实际状态一致，`aria-controls` 指向存在的元素。
- 接收端切换同步更新按钮 `aria-pressed`、示意图及说明，不暗示真实设备连接已建立。
- FAQ 保持原生 `details` / `summary` 行为，键盘可操作。
- 保留跳转正文链接、可见键盘焦点、装饰 SVG 的 `aria-hidden` 和概念图的语义说明。
- 覆盖手机与桌面宽度，尤其检查现有 600px、850px、1150px、1500px 媒体查询边界附近的布局；检查横向溢出、文字遮挡、粘性导航及锚点偏移。
- 保留 `prefers-reduced-motion` 适配；新增动画遵循同一规则。
- UI 修改完成后做浏览器视觉与交互检查；不要把 README 中的历史验证当作本次已执行的结果。

## 6. 技术 SEO 与上线规则

- `layout.tsx` 当前使用 `robots: { index: false, follow: true }`，这是本地草稿的刻意设置。普通文案或样式修改不应顺带删除 `noindex`。
- 正式域名与公开发布状态得到确认后，再配置 `metadataBase`、canonical、Open Graph URL、robots 和 sitemap。统一协议、主机与路径规则，不填入猜测域名或其他产品域名。
- `robots.txt` 的 Disallow 不能替代 `noindex`；需要搜索引擎读取 `noindex` 时，不应同时阻止该页面抓取。
- sitemap 仅列出希望索引且返回正常状态的规范 URL。上线时检查 canonical、robots 元标签与 HTTP `X-Robots-Tag` 是否冲突。
- 首页仍是单页结构；没有新增真实路由的需要时，不为 SEO 制造空页面、重复入口或无内容的多语言 URL。
- 结构化数据只能表达页面可见且已确认的事实，不虚构评分、评论、价格、下载地址或兼容性。
- 外部环境尚未核实，不声称已收录、通过 Core Web Vitals、完成 GSC 检查或配置了 CDN。
- 对技术 SEO 诊断使用以下结构：问题与所属层、根因假设、验证计划、具体修复、影响与风险、监控计划。每项建议说明 High / Medium / Low 影响和风险、验证方法及监控指标。
- 发布验证至少覆盖 HTTP 状态、初始 HTML、索引指令、canonical 和站内链接；有权限时再通过 GSC URL 检查及页面索引报告确认 Google 侧结果。

## 7. 发布资源与敏感操作

- 添加 APK 前核验真实文件、版本、签名证书、CPU 架构、最低 SDK、文件大小和 SHA-256，并记录证据；文件名不能代替二进制检查。
- 兼容性声明需要具体手机、系统、接收端及测试结果，避免泛化为支持所有车型或所有 Android 设备。
- 添加源码仓库链接前核实归属、公开状态和许可证；不擅自为 Android 产品选择开源许可证。
- 隐私文案以已确认的权限、数据收集及支持工具为依据，不凭落地页代码推断 Android 应用不收集数据。
- 不提交 `.env`、访问令牌、个人信息或私有群聊记录；示例配置只放非敏感占位值。
- 部署、APK 公开分发及外部系统写入须在用户授权范围内进行。常规本地编辑与验证不额外设置确认关卡。

## 8. 交付标准

- 总结实际修改、执行过的检查、关键假设和未验证项；失败时给出原因，不写成通过。
- 行为、运行方式或上线要求改变时同步更新 `README.md`，带日期的验证记录只记录当次实际结果。
- 文档任务不顺带修改产品代码；实现任务完成后继续做适当验证，不停留在建议阶段。
