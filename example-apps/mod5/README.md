# サーバーレスアプリケーションのフロントエンドの作成

---
## AWS SAM でバックエンドリソースの作成する
 1. example-apps/mod5/1-sam/README.md の手順を実施する

---
## S3 バケットに商品画像をアップロードする

* AWS SDK for Python (boto3) のインストール

```
cd  ~/environment/example-apps/mod5/2-upload-images
```

```
pip install boto3
```

* アップロードの実行
    - 下記で **BUCKET_NAME** の部分を AWS SAM で作成したバケット名に変更して下さい。

```
python3 s3_image_uploader.py image BUKET_NAME --prefix ''
```

例
```
python3 s3_image_uploader.py image tnobep-backend-image --prefix ''
```

---
## DynamoDB テーブルに商品情報を格納する
1. example-apps/mod5/3-put-data/README.md の手順を実施する

---
## Next.js で新しいプロジェクトを作成する

```
npx  create-next-app@15.3.0 next-serverless
```
    
* 下記のように選択。（Yes と No は横矢印キーで選択）
    - "OK to proceed?" で Enter 
    - ? Would you like to use TypeScript? › No / Yes で **Yes**
    - ? Would you like to use ESLint? › No / Yes で **No**
    - ? Would you like to use Tailwind CSS? › No / Yes で **No**
    - ? Would you like your code inside a `src/` directory? › No / Yes で **Yes**
    - ? Would you like to use App Router? (recommended) › No / Yes で **Yes**
    - ? Would you like to use Turbopack for `next dev`? › No / Yes で **No**
    - ? Would you like to customize the import alias (`@/*` by default)? › No / Yes で **No**
    

* プロジェクトの実行

```
cd ~/environment/next-serverless
```

## Next.js のページの作成

### 開発環境の環境変数とオリジンの設定

1. 下記のファイルを next-serverless へコピーする
   - example-apps/mod5/4-frontend/.env.development
   - example-apps/mod5/4-frontend/next.config.ts

1.  .env.development の NEXT_PUBLIC_URL に AWS SAM の出力の API Gateway のエンドポイントを設定する
    - 例: NEXT_PUBLIC_URL=https://ag9yn6s89e.execute-api.ap-northeast-1.amazonaws.com

1. next.config.ts の allowedDevOrigins に　Code Server のインスタンスの DNS を設定する
    - 例:
    - ```
      import type { NextConfig } from "next";

      const nextConfig: NextConfig = {
          /* config options here */
          allowedDevOrigins: ['ec2-xx-xxx-xxx-xx.ap-northeast-1.compute.amazonaws.com']
      };
      export default nextConfig;
      ```


### ページの編集

1. 下記のファイルを next-serverless/src へコピーする
   - example-apps/mod5/4-frontend/src/utils フォルダごと
   - 
1. next-serverless プロジェクトで、下記のファイルを削除する
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - src/app/page.module.css

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
