# example-apps 各フォルダの概要

このフォルダには、フロントエンド開発の学習用サンプルアプリケーションが含まれています。  
各モジュール（mod）は段階的に進める構成になっています。

---

## mod3 — HTML / CSS / JavaScript と Flask によるフロントエンド基礎

- 静的な HTML / CSS / JavaScript によるフロントエンドの基本的な構成例
- Python Flask を使用した簡易 Web サーバーでの配信例
- EC2 インスタンス上の VS Code Server 環境での実行手順

## mod4 — Next.js のページ作成

- Next.js プロジェクトの新規作成手順
- Hello World ページの作成とルーティング（App Router）
- 共通 UI コンポーネント（ヘッダー・フッター）の追加
- Next.js の Route Handler を使用したバックエンド処理の追加

## mod5 — サーバーレスアプリケーションのフロントエンド作成

- AWS SAM によるバックエンドリソース（API Gateway、Lambda、DynamoDB、S3、Cognito）の構築
- S3 バケットへの商品画像のアップロード
- DynamoDB テーブルへの商品データの投入
- Next.js による商品一覧・検索フロントエンドの作成

## mod6 — 認証・認可の機能追加

- Amazon API Gateway の API に Cognito オーソライザーによる認可設定を追加
- Amplify UI Library を使用した Cognito サインイン・サインアップ画面の実装
- サインイン後の商品検索ページへのアクセス制御

## mod7 — AWS Amplify ホスティングを使用したデプロイ

- AWS CodeCommit リポジトリの作成とコードのプッシュ
- AWS Amplify ホスティングによる Next.js アプリケーションのデプロイ
- 環境変数の設定とサービスロールの構成
- main ブランチへの push による自動 CI/CD パイプライン

## mod8 — AWS リソースの削除手順

- Amplify ホスティングのアプリケーション削除
- CodeCommit リポジトリの削除
- S3 バケット・SAM スタック・CloudFormation スタックの削除
- CloudWatch ログの削除

