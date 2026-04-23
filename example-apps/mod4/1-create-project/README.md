
* ポート 3000 番を使用しているプロセスの ID (PID) を表示

```
sudo lsof -i :3000
```

表示された PID の値をメモしておく

* ポート 3000 番を使用しているプロセスの ID の停止

下記で <PID> を前の手順でメモした PID の値に置き換えて実行

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
    

* 実行

```
cd next-hello
```

```
npm run dev
```

* 新しいターミナルを起動し、VS Code Server の EC2 インスタンスのパブリック IPv4 DNS を取得するコマンドを実行
```
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`  && curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-hostname
```


* ブラウザから http で ポート 3000番でアクセス

例
http://ec2-12-34-123-12.ap-northeast-1.compute.amazonaws.com:3000

* ターミナルで Ctrl + c で停止
