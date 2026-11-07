// Local static preview only; production is served by GitHub Pages.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({ options: {
  hostname: { type: "string", default: "127.0.0.1" },
  port: { type: "string", default: "3101" },
  "base-path": { type: "string", default: process.env.NEXT_PUBLIC_BASE_PATH || "" },
} });
const root = resolve("out");
const basePath = values["base-path"].replace(/\/$/, "");
if (basePath && !/^\/[A-Za-z0-9_/-]+$/.test(basePath)) {
  throw new Error("Use a path such as /PlayBridge, or an empty base path.");
}
await stat(resolve(root, "index.html"));
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png",
  ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
};
const server = createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (basePath && pathname === basePath) {
      res.writeHead(308, { Location: `${basePath}/` }); res.end(); return;
    }
    if (basePath && !pathname.startsWith(`${basePath}/`)) throw new Error("Not found");
    let file = resolve(root, `.${pathname.slice(basePath.length)}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error("Not found");
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    const data = await readFile(resolve(root, "404.html")).catch(() => Buffer.from("Not found"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : data);
  }
});
server.listen(Number(values.port), values.hostname, () => {
  console.log(`Static preview: http://${values.hostname}:${values.port}${basePath}/`);
});
