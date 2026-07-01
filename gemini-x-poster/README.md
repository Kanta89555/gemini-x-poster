# IMFORMATION_GENERATER

AI と Codex を利用して教材サイトを自動生成するためのプロジェクトです。

現時点では、生成エンジンの土台となるフォルダ、プロンプト、共通知識、テンプレート、ドキュメントのみを用意しています。

## ディレクトリ構成

- `engine/prompts/`: 教材生成工程ごとのプロンプトテンプレート
- `engine/prompts/styles/`: 分野別の文体・用語ルール
- `engine/knowledge/`: 共通知識、用語、参照情報
- `engine/templates/`: HTML やエクスポート形式のテンプレート
- `scripts/`: 将来の生成スクリプト配置先
- `articles/`: 将来の記事データ配置先
- `public/`: 公開用アセット配置先
- `exports/`: 生成結果の出力先
- `docs/`: 設計やワークフローのドキュメント

## 自動生成の入口

記事生成の土台として、次のコマンドでトピック候補を確認できます。

- `npm run test:generate`
- `node scripts/generate-article.js`

実際に記事の雛形を生成する場合は、次のコマンドを使用します。

- `npm run generate:article`

このコマンドは、未着手のトピックを検索し、Markdown と HTML の雛形を articles/ と public/ に出力します。

## 今後の予定

- プロンプト内容の具体化
- 教材生成ワークフローの定義
- 記事データ形式の設計
- HTML、note、PDF などの出力テンプレート整備
- 生成・検証用スクリプトの追加
