# 価値観あてクイズ（values-quiz）

お互いの価値観をどれだけ当てられるかを競い合う、2人用のクイズゲームです。スマホ1台を交代で使って遊びます。

- **AI / API は一切使いません。** 見た目のための Tailwind CDN と、下記「プレイ回数カウント」の軽量な通信を除き、外部へ送信するデータはありません。
- 質問・選択肢はすべてアプリ内（`src/App.jsx` の `const BANK = {...}`）に埋め込み済みで、オフラインでも動作します。
- 既出の質問などは、ブラウザの localStorage に保存されます。エッチ（大人向け）カテゴリの解禁は保存せず、起動時とホームに戻るたびに非表示へ戻ります。

## 技術構成

- Vite + React
- Tailwind CSS（`index.html` の `<head>` で CDN 読み込み）
- 追加ライブラリなし

## ローカルで実行する

```bash
npm install
npm run dev
```

表示された URL（通常 http://localhost:5173/）をブラウザで開いてください。

本番ビルドの確認:

```bash
npm run build     # dist/ に出力
npm run preview   # ビルド結果をローカルで確認
```

## デプロイ

### Vercel / Netlify（おすすめ・設定不要）

1. このリポジトリを GitHub に push する
2. Vercel または Netlify で「Import」する
3. ビルド設定はデフォルトのままでOK（環境変数も不要）
   - Build command: `npm run build`
   - Output directory: `dist`

### GitHub Pages

同梱の GitHub Actions ワークフロー（`.github/workflows/deploy.yml`）で自動デプロイできます。

1. リポジトリの **Settings → Pages → Build and deployment** の "Source" を **GitHub Actions** に設定
2. `main` ブランチに push（または Actions タブから手動実行）

ワークフローが `base` をリポジトリ名（例: `/values-quiz/`）に自動設定してビルドします。手動でビルドする場合は以下のように環境変数を渡してください:

```bash
VITE_BASE="/リポジトリ名/" npm run build
```

## 統計（モード別プレイ回数カウント）

「価値観あてクイズ」と「会話カード」が**それぞれ何回開始されたか**だけを数えます。

- **保存されるのは整数2つだけ。** 個人情報・IP・端末情報・生ログは一切送信しません。
- サーバーは用意していません。アカウント不要の無料カウンターサービス **[Abacus](https://abacus.jasoncameron.dev/)** を利用し、モード開始時に該当カウンターを +1 するだけです（`src/App.jsx` の `bumpPlay()`）。
- 通信は**ベストエフォート**。失敗してもゲームは普通に動きます（オフラインでもプレイ可能）。
- 設定は `src/App.jsx` 冒頭の定数で管理：
  - `COUNTER_BASE` … カウンターサービスのURL
  - `COUNTER_NS` … 名前空間（このアプリ専用の固定文字列）
  - `COUNTER_KEY` … `{ quiz: "play-quiz", cards: "play-cards" }`
- 別のサービス（例：Cloudflare Workers + KV）に切り替えたくなったら、この定数と `bumpPlay()` / `getPlayCounts()` の中身を差し替えるだけです。

### 集計の見かた（隠しページ）

ホーム画面のタイトル「価値観あてクイズ」を **5回タップ**すると、統計画面が開き、モード別の合計回数が表示されます（メニューやリンクからは辿れません）。「🔄 最新の数値に更新」で再取得できます。

> 注意：無料カウンターサービスに依存するため、サービス側が停止・仕様変更した場合はカウントできなくなることがあります。その場合は上記の定数を別サービスに差し替えてください。

## 質問を増やしたいとき

質問データの元ファイルは `question-bank.json` です（難易度 × カテゴリごとに `question` と `choices` を持ちます）。

質問を増減・編集したい場合は `question-bank.json` を編集し、その内容で `src/App.jsx` 内の `const BANK = {...}` を置き換えれば反映されます。

## 補足

- 広告・アナリティクス・トラッキングは一切含まれていません。
- 難易度は easy / normal / hard、カテゴリは「なんでも／究極の2択／食べ物・グルメ／旅行・おでかけ／恋愛・関係／性格・価値観／趣味・エンタメ／仕事・お金」です。
