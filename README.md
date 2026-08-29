# どれだけ知ってる？（know-you-game）

相手のことをどれだけ知っているかを当て合う、2人用のクイズゲームです。スマホ1台を交代で使って遊びます。

- **AI / API は一切使いません。** 実行時に外部への通信は行いません（唯一の外部読み込みは、見た目のための Tailwind CDN のみ）。
- 質問・選択肢はすべてアプリ内（`src/App.jsx` の `const BANK = {...}`）に埋め込み済みで、オフラインでも動作します。
- 既出の質問や隠しカテゴリの解禁状態などは、ブラウザの localStorage に保存されます。

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

## 質問を増やしたいとき

質問データの元ファイルは `question-bank.json` です（難易度 × カテゴリごとに `question` と `choices` を持ちます）。

質問を増減・編集したい場合は `question-bank.json` を編集し、その内容で `src/App.jsx` 内の `const BANK = {...}` を置き換えれば反映されます。

## 補足

- 広告・アナリティクス・トラッキングは一切含まれていません。
- 難易度は easy / normal / hard、カテゴリは「なんでも／究極の2択／食べ物・グルメ／旅行・おでかけ／恋愛・関係／性格・価値観／趣味・エンタメ／仕事・お金」です。
