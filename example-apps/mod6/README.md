# 認証・認可の機能追加

## 前提

* mod5 で next-serverless プロジェクトの作成を完了していること

## バックエンドの API の認可設定

1. API への認可設定
   - mod5 で既に Cognito ユーザープールを作成し、Amazon API Gateway の API にも Cognito オーソライザー設定済。
   - しかし、現在は、各 API でオーソライザーの認可を使用する設定にはなっていない。
   - そこで、APIに認可を行う設定に変更する
   - SAM テンプレートで、関数の Event の Auth でオーソライザーを無しにしている設定をコメントにする
   - （frontend-work/example-apps/mod5/1-sam/backend/template.yaml で 2カ所）
       1. テンプレート　44行目から 45行目の Auth: Authorizer: NONE の設定
       1. テンプレート  74行目から 75行目の Auth: Authorizer: NONE の設定
       1. AWS SAM でデプロイ 
          - ```
            cd ~/environment/frontend-work/example-apps/mod5/1-sam/backend
            sam validate
            ```
            
          - ```
            sam build --use-container
            ```

          - ```
            sam deploy
            ```
1. AWS マネジメントコンソールで Amazon API Gateway の next-serverless-backend-api の各 GET, POST のメソッドリクエストの認可設定で Congnitoのオーソライザーが設定されていることを確認 

## Next.js のページに認証機能を追加

### Amplify UI Library のインストール

   - ```
     cd ~/environment/next-serverless
     ```
   
   - ```
     npm  install  @aws-amplify/ui-react  aws-amplify
     ```

### Cognito ユーザープールの情報の追加

1. 下記のファイルを next-serverless/src/utils へコピーする
   - example-apps/mod6/2-auth/src/utils/aws-exports.ts
1. aws-exports.ts に SAM のデプロイ完了時に表示された UserPoolAppClient や UserPoolId の値に置き換え
   - 例
   - ```
     const awsconfig = {
     Auth: {
       Cognito: {
         userPoolClientId: '4abc9abcd876abcdefg764abc2a',
         userPoolId: 'us-west-2_abcdefg',
        }
      }
     }

     export default awsconfig;
     ```

### Amplify UI Library の日本語用マッピングファイル作成

1. 下記のファイルを next-serverless/src へコピーする
   - example-apps/mod6/2-auth/src/translations フォルダごと

### ページの編集

1. 下記のファイルを next-serverless/src/app へコピーする
   - example-apps/mod6/2-auth/src/app/page.tsx

### 実行

1. ターミナルから下記のコマンドで next-serverless プロジェクトを実行する

  ```
  cd ~/environment/next-serverless
  ```

  ```
  npm run dev
  ```

1. ブラウザで、Code Server のインスタンスの DNS に http で 3000番ポートにアクセスする
   - Amplify UI Library によるサインイン・サインアップページが表示されることを確認

1. サインアップタブを選択してユーザー登録
    * サインアップで受信可能なメールアドレスを指定
    * パスワード要件
      - 8 文字以上
      - 最低 1つの数字を含む
      - 最低 1つの大文字を含む
      - 最低 1つの小文字を含む
      - 最低 1つの特殊文字を含む

1. サインアップ後、商品検索ページが表示され、ページ右上にサインインユーザー ID とサインアウトボタンが表示されることを確認

1. 商品検索機能を確認

1. サインアウトボタンをクリック   

1. ターミナルで Ctrl + c で停止









