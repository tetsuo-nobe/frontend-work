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


## AWS CodeCommitの リポジトリへの push

1. リモートリポジトリとして CodeCommit リポジトリを設定
    - ```
      cd ~/environment/next-serverless 
      git remote add origin https://github.com/tetsuo-nobe/next-serverless.git
      ```

1. ステータスの確認
    - ```
      git branch -M main
      git status
      ```
     
1. コミット     
    -  ```
       git add .
       git commit –m “add .env.production”
       ```

1. リモートリポジトリへプッシュ     
    - ```
      git push -u origin main
      ```

## AWS Amplify ホスティングによるデプロイ
   

