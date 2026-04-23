
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

* 実行

```
cd next-hello
```

```
npm run dev
```

ブラウザから http で ポート 3000番でアクセス
例
http://ec2-12-34-123-12.ap-northeast-1.compute.amazonaws.com:3000

* ターミナルで Ctrl + c で停止