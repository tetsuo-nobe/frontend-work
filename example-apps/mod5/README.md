# サーバーレスアプリケーションのフロントエンドの作成

---
## AWS SAM でバックエンドリソースの作成する

1. 下記のコマンドを実行して AWS SAM でバックエンドのリソースを作成する
　
    ```
    cd  ~/environment/frontend-work/example-apps/mod5/1-sam/backend
    ```

    ```
    sam  build --use-container
    ```

    ```
    sam  deploy  --guided
    ```
    
    - スタック名は、デフォルトの backend のままにする
    - リージョンは、us-west-2 に変更する
    - その他はデフォルトのままにする

1. SAM によるデプロイ完了時に表示される出力内容をメモしておく

---
## S3 バケットに商品画像をアップロードする

1. AWS SDK for Python (boto3) のインストール

    ```
    cd  ~/environment/frontend-work/example-apps/mod5/2-upload-images
    ```

    ```
    pip3 install boto3
    ```

1. アップロードの実行
    - 下記で **BUCKET_NAME** の部分を AWS SAM で作成したバケット名に変更する

    ```
    python3 s3_image_uploader.py image BUKET_NAME --prefix ''
    ```

    例
    ```
    python3 s3_image_uploader.py image tnobep-backend-image --prefix ''
    ```

---
## DynamoDB テーブルに商品情報を格納する

1. ~/environment/frontend-work/example-apps/mod5/3-put-data/data_loader.py を開く

1. your_bucket 変数に AWS SAM の Outputs の ItemImageURL の値から **https:// を除いた文字列**を貼り付ける

1. AWS SDK for Python (boto3) はインストール済の前提

  ```
  cd  ~/environment/frontend-work/example-apps/mod5/3-put-data
  ```

  ```
  python3 data_loader.py 
  ```


---
## Next.js で新しいプロジェクトを作成する

```
cd  ~/environment
npx  create-next-app@15.3.0 next-serverless
```
    
1. 下記のように選択。（Yes と No は横矢印キーで選択）
    - "OK to proceed?" で Enter 
    - ? Would you like to use TypeScript? › No / Yes で **Yes**
    - ? Would you like to use ESLint? › No / Yes で **No**
    - ? Would you like to use Tailwind CSS? › No / Yes で **No**
    - ? Would you like your code inside a `src/` directory? › No / Yes で **Yes**
    - ? Would you like to use App Router? (recommended) › No / Yes で **Yes**
    - ? Would you like to use Turbopack for `next dev`? › No / Yes で **No**
    - ? Would you like to customize the import alias (`@/*` by default)? › No / Yes で **No**
    

1. プロジェクトの実行

  ```
  cd ~/environment/next-serverless
  ```

---
## Next.js のページの作成

### 開発環境の環境変数とオリジンの設定

1. `.env.development` という名前のファイルを next-serverless フォルダ直下へ作成する。

1. .env.development の NEXT_PUBLIC_URL に AWS SAM の出力の NextServerlessBackendAPI の値を設定する
    - 例:
    - ```
      NEXT_PUBLIC_URL=https://ag9yn6s89e.execute-api.ap-northeast-1.amazonaws.com
      ```

1. 下記のファイルを開く
   - next-serverless/next.config.ts

1. next.config.ts に下記のように allowedDevOrigins でCode Server のインスタンスの DNS を追加設定する
    - 例:
    - ```
      import type { NextConfig } from "next";

      const nextConfig: NextConfig = {
          /* config options here */
          allowedDevOrigins: ['ec2-xx-xxx-xxx-xx.ap-northeast-1.compute.amazonaws.com']
      };
      export default nextConfig;
      ```

---
### ページの編集

1. 下記のファイルを next-serverless/src へコピーする
   - example-apps/mod5/4-frontend/src/utils フォルダごと

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
