# AWS Amplify ホスティングを使用したデプロイ

## 前提

* mod5 と mod6 の next-serverless プロジェクトの作成を完了していること

## 本番環境用の環境変数の値をメモ

1. .env.development の NEXT_PUBLIC_URL の値をメモしておく

## AWS CodeCommitの リポジトリの作成

### 1. 事前準備

ここでは CodeCommit への接続に `git-remote-codecommit` を使用する。
未インストールの場合は、下記で事前にインストールする

```bash
pip3 install git-remote-codecommit
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
cd ~/environment/next-serverless
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

#### 4-1. main ブランチの設定

CodeCommit のデフォルトブランチは、最初に push されたブランチが自動的に設定される
`main` ブランチで最初の push を行う

```bash
git push -u origin main
```

#### 4-2. デフォルトブランチを main に変更（確認・明示的に設定）

```bash
aws codecommit update-default-branch --repository-name next-serverless --default-branch-name main
```

### 5. アプリケーションコードのコミットとプッシュ

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "next-serverless with auth"
```

```bash
git push
```


## AWS Amplify ホスティングによるデプロイ
   
## 1. Amplify コンソールを開く

1. AWS マネジメントコンソールにサインインする
2. 右上のリージョン選択で **米国西部（オレゴン）us-west-2** を選択する
3. サービス検索バーに `amplify` と入力し、**AWS Amplify** を選択する

## 2. アプリケーションの作成

1. **アプリケーションをデプロイ** をクリックする
2. Git プロバイダー として **CodeCommit** を選択する
3. **次へ** をクリックする

## 3. リポジトリとブランチの選択

1. **リポジトリを選択** の **リストから選択**で `next-serverless` を選択する
2. **ブランチ** で `main` を選択する
3. **次へ** をクリックする

## 4. アプリケーションの設定

### 4-1. ビルド設定の確認

1. Amplify が Next.js プロジェクトを自動検出し、ビルド設定が自動生成される。
1. 「自動検出されたフレームワーク」に **Next.js** と表示されていることを確認

### 4-2. サービスロール

Amplify がリポジトリにアクセスするためのサービスロールを設定する。

1. **新しいロールを作成して使用** を選択
   - 遷移先の IAM コンソールでデフォルト設定のまま **次へ** を進め、ロールを作成する
   - Amplify コンソールに戻り、作成したロールを選択する

### 4-3. 環境変数の設定

設定手順:

1. **詳細設定** セクションを展開する
2. **環境変数** で **新規追加**　をクリック
3. キーと値のペアで追加する
   - 例: キー `NEXT_PUBLIC_API_URL`、値 メモしていた .env.development の NEXT_PUBLIC_API_URL の値

> Amplify の環境変数は .env ファイルより優先される。同じキーが両方に存在する場合、Amplify 側の値が使用される。


## 5. 確認とデプロイ

1. **次へ** をクリック
1. 設定内容を確認する
1. **保存してデプロイ** をクリックする
1. デプロイが開始され、以下のフェーズが順に実行される
   - **プロビジョン** — ビルド環境の準備
   - **ビルド** — `npm ci` と `npm run build` の実行
   - **デプロイ** — ビルド成果物の配信
   - **検証** — デプロイの確認

## 6. デプロイ結果の確認

1. ブランチ で main のところに **デプロイ済** の緑色のメッセージが表示されればデプロイ完了
2. ドメイン に、Amplify が自動生成した URL（`https://main.<app-id>.amplifyapp.com`）が表示される
3. URL をクリックし、アプリケーションが正常に動作することを確認する

* 以後、CodeCommit の `main` ブランチに push すると、Amplify が自動的にビルドとデプロイを実行する。
* この CI/CD パイプラインはデフォルトで有効になっている。

