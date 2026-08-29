import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base の決め方:
// - Vercel / Netlify で公開する場合: 何も設定しなくてOK（デフォルトの "/"）
// - GitHub Pages で公開する場合: リポジトリ名を base にする必要があるため、
//   ビルド時に環境変数 VITE_BASE を渡す。例: VITE_BASE="/values-quiz/" npm run build
//   （同梱の .github/workflows/deploy.yml が自動でこれを設定します）
export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react()],
});
