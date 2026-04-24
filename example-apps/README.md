# AWS Amplify ホスティングを使用したデプロイ

## 前提

* mod5 と mod6 の next-serverless プロジェクトの作成を完了していること

## 本番環境用の環境変数の設定

1. `.env.production` という名前のファイルを next-serverless フォルダ直下へ作成する。

1. .env.production の NEXT_PUBLIC_URL に AWS SAM の出力の NextServerlessBackendAPI の値を設定する
    - 例:
    - ```
      NEXT_PUBLIC_URL=https://ag9yn6s89e.execute-api.ap-northeast-1.amazonaws.com
      ```

## .gitignore ファイルの設定

1. 下記のファイルを開く
   - next-serverless/.gitignore
   - .gitignore で .env.production ファイルがリポジトリに含まれるように下記例のように設定
   - 例: `.env*` を `.env.development` に変更
   - ```
     (前略）

     # env files (can opt-in for committing if needed)
     .env.development
     （以降は略）
     ```

## AWS CodeCommitの リポジトリの作成

### 1. 事前準備

ここでは CodeCommit への接続に `git-remote-codecommit` を使用する。
未インストールの場合は、下記で事前にインストールする

```bash
pip install git-remote-codecommit
```

### 2. AWS CodeCommit リポジトリの作成

AWS CLI を使用して `next-serverless` リポジトリを作成する

```bash
aws codecommit create-repository --repository-name next-serverless --repository-description "Next.js を使用した商品検索のフロントエンド"
```

### 3. ローカルリポジトリにリモートリポジトリを追加

既存のローカル `next-serverless` ディレクトリに CodeCommit リポジトリをリモートとして追加する

#### 3-1. リモートリポジトリを追加

```bash
cd next-serverless
git remote add origin codecommit://next-serverless
```

#### 3-2. リモート設定の確認

```bash
git remote -v
```

以下のように表示されれば設定完了

```
origin  codecommit://next-serverless (fetch)
origin  codecommit://next-serverless (push)
```

### 4. main ブランチをデフォルトブランチに設定

#### 4-1. main ブランチを push

CodeCommit のデフォルトブランチは、最初に push されたブランチが自動的に設定される
`main` ブランチで最初の push を行う

```bash
git push -u origin main
```

#### 4-2. デフォルトブランチを main に変更（確認・明示的に設定）

```bash
aws codecommit update-default-branch --repository-name next-serverless --default-branch-name main
```


## AWS Amplify ホスティングによるデプロイ
   
## 1. Amplify コンソールを開く

1. AWS マネジメントコンソールにサインインする
2. 右上のリージョン選択で **米国西部（オレゴン）us-west-2** を選択する
3. サービス検索バーに `amplify` と入力し、**AWS Amplify** を選択する

## 2. アプリケーションの作成

1. **新しいアプリを作成** をクリックする
2. ソースコードリポジトリに **AWS CodeCommit** を選択する
3. **次へ** をクリックする

## 3. リポジトリとブランチの選択

1. **最近更新されたリポジトリ** から `next-serverless` を選択する
2. **ブランチ** で `main` を選択する
3. **次へ** をクリックする

## 4. アプリケーションの設定

### 4-1. ビルド設定の確認

* Amplify が Next.js プロジェクトを自動検出し、ビルド設定が自動生成される。
* 以下のような `amplify.yml` が表示されることを確認する。

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - node_modules/**/*
```

> プロジェクトで `yarn` や `pnpm` を使用している場合は、`npm ci` / `npm run build` の部分を適宜変更する。

### 4-2. 環境変数の設定（必要な場合のみ）

`.env.production` がリポジトリに含まれていれば、ビルド時に Next.js が自動的に読み込むため、基本的に Amplify 側での環境変数設定は不要。

以下のケースでは、Amplify の環境変数を設定する。

- **機密情報**（API キー、シークレットなど）をリポジトリに含めたくない場合
- **ブランチごとに値を変えたい**場合
- `.env.production` に含まれていない追加の変数が必要な場合

設定手順:

1. **詳細設定** セクションを展開する
2. **環境変数** にキーと値のペアで追加する
   - 例: キー `NEXT_PUBLIC_API_URL`、値 `https://api.example.com`
3. 機密情報は `.env.production` から削除し、Amplify の環境変数のみで管理することを推奨

> Amplify の環境変数は `.env.production` より優先される。同じキーが両方に存在する場合、Amplify 側の値が使用される。

### 4-3. サービスロール

Amplify がリポジトリにアクセスするためのサービスロールを設定する。

1. 既存のサービスロールがある場合はそれを選択する
2. ない場合は **新しいロールを作成** をクリックし、IAM コンソールでロールを作成する
   - 遷移先の IAM コンソールでデフォルト設定のまま **次へ** を進め、ロールを作成する
   - Amplify コンソールに戻り、作成したロールを選択する

## 5. 確認とデプロイ

1. 設定内容を確認する
2. **保存してデプロイ** をクリックする
3. デプロイが開始され、以下のフェーズが順に実行される
   - **プロビジョン** — ビルド環境の準備
   - **ビルド** — `npm ci` と `npm run build` の実行
   - **デプロイ** — ビルド成果物の配信
   - **検証** — デプロイの確認

## 6. デプロイ結果の確認

1. すべてのフェーズが緑色のチェックマークになればデプロイ完了
2. Amplify が自動生成した URL（`https://main.<app-id>.amplifyapp.com`）が表示される
3. URL をクリックし、アプリケーションが正常に動作することを確認する

## 7. 自動デプロイの確認

CodeCommit の `main` ブランチに push すると、Amplify が自動的にビルドとデプロイを実行する。
この CI/CD パイプラインはデフォルトで有効になっている。

