import os
import boto3
import mimetypes
from pathlib import Path

def upload_images_to_s3(folder_path, bucket_name, prefix=''):
    """
    指定されたフォルダ内のすべての画像ファイルをS3バケットにアップロードする関数
    
    Parameters:
    folder_path (str): 画像ファイルが含まれるフォルダのパス
    bucket_name (str): アップロード先のS3バケット名
    prefix (str): S3内のプレフィックス（フォルダパス）、デフォルトは空文字
    
    Returns:
    list: アップロードされたファイルのリスト
    """
    # S3クライアントの初期化
    s3_client = boto3.client('s3')
    
    # アップロードされたファイルのリスト
    uploaded_files = []
    
    # フォルダが存在するか確認
    if not os.path.exists(folder_path):
        print(f"エラー: フォルダ '{folder_path}' が見つかりません。")
        return uploaded_files
    
    # フォルダ内のすべてのファイルを走査
    for root, _, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            
            # ファイルのMIMEタイプを取得
            mime_type, _ = mimetypes.guess_type(file_path)
            
            # 画像ファイルかどうかを確認
            if mime_type and mime_type.startswith('image/'):
                try:
                    # S3内のオブジェクトキーを作成
                    relative_path = os.path.relpath(file_path, folder_path)
                    s3_key = os.path.join(prefix, relative_path).replace('\\', '/')
                    
                    print(f"アップロード中: {file_path} -> s3://{bucket_name}/{s3_key}")
                    
                    # ファイルをS3にアップロード
                    s3_client.upload_file(
                        Filename=file_path,
                        Bucket=bucket_name,
                        Key=s3_key,
                        ExtraArgs={'ContentType': mime_type}
                    )
                    
                    uploaded_files.append(s3_key)
                    print(f"アップロード成功: {file_path}")
                    
                except Exception as e:
                    print(f"アップロード失敗: {file_path} - エラー: {str(e)}")
    
    print(f"合計 {len(uploaded_files)} 個の画像ファイルがアップロードされました。")
    return uploaded_files

def main():
    """
    メイン関数 - コマンドライン引数を解析して画像アップロード関数を実行
    """
    import argparse
    
    parser = argparse.ArgumentParser(description='フォルダ内の画像ファイルをS3バケットにアップロードします。')
    parser.add_argument('folder_path', help='画像ファイルが含まれるフォルダのパス')
    parser.add_argument('bucket_name', help='アップロード先のS3バケット名')
    parser.add_argument('--prefix', default='', help='S3内のプレフィックス（フォルダパス）')
    
    args = parser.parse_args()
    
    upload_images_to_s3(args.folder_path, args.bucket_name, args.prefix)

if __name__ == "__main__":
    main()
