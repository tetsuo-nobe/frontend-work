
## モジュール 3

* VS Code Server の EC2 インスタンスのパブリック IPv4 DNS を取得するコマンド
```
TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`  && curl -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-hostname
```

* Flask のインストール

```
cd ~/environment/example-apps/mod3/examples_flask_js/
pip install flask
```

* Flask アプリケーションの実行

```
python3 app.py
```


* 表示された DNS 名に、http プロトコルのポート 8090 番でアクセス

例
http://ec2-12-123-123-12.ap-northeast-1.compute.amazonaws.com:8090