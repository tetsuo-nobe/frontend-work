# サーバーレスアプリケーションのフロントエンドの作成

## Hello World ページの作成

1. next-hello プロジェクトで、下記のファイルを削除する
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx

1. 下記のファイルを next-hello/src/app へコピーする
   - example-apps/mod4/2-HelloWorld/info フォルダごと
   - example-apps/mod4/2-HelloWorld/globals.css
   - example-apps/mod4/2-HelloWorld/layout.tsx
   - example-apps/mod4/2-HelloWorld/page.tsx

1. ターミナルから下記のコマンドで next-hello プロジェクトを実行する

    ```
    cd ~/environment/next-hello
    npm run dev
    ```
1. ブラウザで、Code Server のインスタンスの DNS に http で 3000番ポートにアクセスする
   - Top ページが表示され、Hello World! と表示されることを確認
   - リンクで info ページへ移動し、Top ページに戻れることを確認

1. ターミナルで Ctrl + c で停止

## 共通的な UI コンポーネントの追加

1. next-hello プロジェクトで、下記のファイルを削除する
    - src/app/globals.css
    - src/app/layout.tsx

1. 下記のファイルを next-hello/src/app へコピーする
   - example-apps/mod4/3-components/_components フォルダごと
   - example-apps/mod4/3-components/globals.css
   - example-apps/mod4/3-components/layout.tsx

1. ターミナルから下記のコマンドで next-hello プロジェクトを実行する

    ```
    npm run dev
    ```
1. ブラウザで、Code Server のインスタンスの DNS に http で 3000番ポートにアクセスする
   - Top ページと info ページで共通のヘッダー、フッターが表示されることを確認

1. ターミナルで Ctrl + c で停止

## Next.js におけるバックエンドの処理の追加

1. next-hello プロジェクトで、下記のファイルを削除する
    - src/app/page.tsx

1. 下記のファイルを next-hello/src/app へコピーする
   - example-apps/mod4/3-components/api フォルダごと
   - example-apps/mod4/3-components/page.tsx

1. ターミナルから下記のコマンドで next-hello プロジェクトを実行する

    ```
    npm run dev
    ```
1. ブラウザで、Code Server のインスタンスの DNS に http で 3000番ポートにアクセスする
   - Top ページで名前を入力して Greeting ボタンをクリックすると、「こんにちは！ (入力名)さん」と表示されることを確認

1. ターミナルで Ctrl + c で停止
