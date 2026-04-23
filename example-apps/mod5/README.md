# サーバーレスアプリケーションのフロントエンドの作成

## AWS SAM でバックエンドリソースの作成する
 1. example-apps/mod5/1-sam/README.md の手順を実施する

## S3 バケットに商品画像をアップロードする
 1. example-apps/mod5/2-upload-images/README.md の手順を実施する

## DynamoDB テーブルに商品情報を格納する
1. example-apps/mod5/3-put-data/README.md の手順を実施する

## Next.js で新しいプロジェクトを作成する


## Next.js の

1. next-serverless プロジェクトで、下記のファイルを削除する
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx

1. 下記のファイルを next-hello/src/app へコピーする
   - example-apps/mod5/4-frontend/api フォルダごと
   - example-apps/mod5/4-frontend/utils フォルダごと

1. ターミナルから下記のコマンドで next-serverless プロジェクトを実行する

    ```
    npm run dev
    ```
1. ブラウザで、Code Server のインスタンスの DNS に http で 3000番ポートにアクセスする
   - 商品の一覧が表示され、検索もできることを確認する

1. ターミナルで Ctrl + c で停止
