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
   

