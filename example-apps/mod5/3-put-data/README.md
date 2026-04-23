
### JSON ファイルの商品データを Amazon DynamoDB テーブルへ格納


* ~/environment/example-apps/mod5/3-put-data/data_loader.py を開きます。

* your_bucket 変数に AWS SAM の Outputs の ItemImageURL の値から **https:// を除いた文字列**を貼り付けます。

* AWS SDK for Python (boto3) はインストール済の前提

```
cd  ~/environment/example-apps/mod5/3-put-data
```

```
python3 data_loader.py 
```
