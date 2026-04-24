# AWS リソース削除手順

## 1. Amplify ホスティングのアプリケーションを削除

1. AWS マネジメントコンソールにサインインする
2. リージョンが **us-west-2（オレゴン）** であることを確認する
3. サービス検索バーに「Amplify」と入力し、**AWS Amplify** を選択する
4. アプリケーション一覧から `next-serverless` を選択する
5. 左メニューの **アプリの設定** > **全般** を選択する
6. ページ右上の **アクション** > **アプリの削除** を選択する
7. 確認ダイアログに「delete」と入力し、**削除** をクリックする

## 2. CodeCommit リポジトリを削除

```bash
aws codecommit delete-repository --repository-name next-serverless
```

## 3. S3 バケットのオブジェクトを削除

AWS SAM で作成した S3 バケット内のすべてのオブジェクトを削除する。

```bash
aws s3 rm s3://<バケット名> --recursive
```

> `<バケット名>` は実際に作成した S3 バケット名（SAM 出力の ItemImageBucket の値）に置き換える。

## 4. SAM で作成したバックエンドリソースを削除

```bash
cd ~/environment/frontend-work/example-apps/mod5/1-sam/backend
```

```bash
sam delete --no-prompts
```

> `samconfig.toml` が存在するディレクトリで実行する。スタック名や リージョンは `samconfig.toml` の設定が使用される。
