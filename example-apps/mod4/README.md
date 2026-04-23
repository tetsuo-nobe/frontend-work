# Next.js のページの作成

## Next.js プロジェクトの作成

* ターミナルで下記の実行し、ポート 3000 番を使用しているプロセスの ID (PID) を表示
```
sudo lsof -i :3000
```

    * PID が表示された場合、その値をメモしておく
    * ポート 3000 番を使用しているプロセスの ID の停止
    * 下記で <PID> を前の手順でメモした PID の値に置き換えて実行
    
    ```
    kill -9 <PID>
    ```

* Node.js のインストールの確認
```
cd ~/environment 
```

```
node -v
npm -v
npx -v
```

* Next.js プロジェクト作成

```
npx  create-next-app@15.3.0 next-hello
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
cd ~/environment/next-hello 
```

```
npm run dev
```

* 新しいターミナルを起動し、VS Code Server の EC2 インスタンスのパブリック IPv4 DNS を取得するコマンドを実行
```
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`  && curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-hostname
```

* 表示された VS Code Server の EC2 インスタンスのパブリック IPv4 DNS の値は今後に使用するのでメモしておく

* インスタンスのパブリック IPv4 DNS の 3000番ポートにブラウザから http でアクセスして、ページが表示されることを確認

例
http://ec2-12-34-123-12.ap-northeast-1.compute.amazonaws.com:3000

* Next.js プロジェクトを実行した起動ターミナルで Ctrl + c で停止


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
