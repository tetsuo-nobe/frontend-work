# 認証・認可の機能追加

## 前提

* mod5 で next-serverless プロジェクトの作成を完了していること

##　バックエンドの API の認可設定

1. API への認可設定
   - mod5 で既に Cognito ユーザープールを作成し、Amazon API Gateway の API にも Cognito オーソライザー設定済。
   - しかし、現在は、各 API でオーソライザーの認可を使用する設定にはなっていない。
   - そこで、APIに認可を行う設定に変更する
   - テンプレートで、関数の Event の Auth設定をコメントにする（2カ所）
       1. テンプレート　44行目から
       1. テンプレート  74行目から
       1. AWS SAM でデプロイ 
          - ```
            cd ~/environment/frontend-work/example-apps/mod5/1-sam/backend
            sam validate

            sam deploy
1.             ```


