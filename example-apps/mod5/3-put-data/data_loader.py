import json
import boto3

ddb = boto3.client("dynamodb")
table_name = "backend-items"

# AWS SAM の Outputs の ItemImageURL の値を下記の変数に設定
your_bucket = "xxxxx.s3.ap-northeast-1.amazonaws.com"

try:
  # ファイルオープンとロード 
  f = open('item_data.json')
  items = json.load(f)  
  #
  for rec in items:
      item = {
        "id":   {"S": str(rec["id"])},
        "itemName": {"S": rec["itemName"]},
        "category": {"S": rec["category"]},
        "categoryName": {"S": rec["categoryName"]},
        "price":  {"N": str(rec["price"])},
        "description": {"S": rec["description"]},
        "image": {"S": rec["image"].replace("IMAGE_BUCKET",your_bucket)}
      }
      ddb.put_item(TableName=table_name, Item=item)
        
  # ファイルのクローズ
  f.close()
  print("JSONファイルからのデータのロードが完了しました")

except Exception as e:
  msg = {"message": "アイテム作成失敗"}
  print(f"予期しないエラーが発生しました: {e}")

