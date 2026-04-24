


### image フォルダの画像を Amazon S3 バケットへアップロード

* AWS SDK for Python (boto3) のインストール

```
cd  ~/environment/example-apps/mod5/2-upload-images
```

```
pip install boto3
```

* アップロードの実行
    - 下記で **BUCKET_NAME** の部分を AWS SAM で作成したバケット名（ItemImageBucket の値）に変更して下さい。

```
python3 s3_image_uploader.py image BUKET_NAME --prefix ''
```

例
```
python3 s3_image_uploader.py image tnobep-backend-image --prefix ''
```
