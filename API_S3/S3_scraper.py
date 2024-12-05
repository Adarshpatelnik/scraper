import os
import boto3
import yaml
from datetime import datetime, timezone

def load_config(file_path):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

def authenticate_aws_s3(aws_credentials):
    return boto3.client('s3', aws_access_key_id=aws_credentials['access_key_id'], 
                        aws_secret_access_key=aws_credentials['secret_access_key'])

def fetch_data_from_bucket(s3, source_bucket_name, source_folder, download_location, from_datetime=None, to_datetime=None):
    objects = s3.list_objects_v2(Bucket=source_bucket_name, Prefix=source_folder)['Contents']
    
    for obj in objects:
        object_key = obj['Key']
        last_modified = obj['LastModified']
        last_modified = last_modified.replace(tzinfo=timezone.utc).astimezone(None).replace(tzinfo=None)
        if (from_datetime is None or last_modified >= from_datetime) and \
           (to_datetime is None or last_modified <= to_datetime):
            download_file(s3, source_bucket_name, object_key, download_location)

def download_file(s3, bucket_name, object_key, download_location):
    file_name = os.path.basename(object_key)
    file_path = os.path.join(download_location, file_name)
    try:
        s3.download_file(bucket_name, object_key, file_path)
        print(f"Downloaded '{object_key}' to '{file_path}'")
    except Exception as e:
        print(f"Failed to download '{object_key}': {str(e)}")

def upload_folder(s3, folder_path, destination_bucket_name, destination_folder):
    for root, _, files in os.walk(folder_path):
        for file in files:
            local_file_path = os.path.join(root, file)
            s3_file_key = os.path.relpath(local_file_path, folder_path)
            s3_file_key = os.path.join(destination_folder, s3_file_key)
            s3.upload_file(local_file_path, destination_bucket_name, s3_file_key)
            print(f"Uploaded '{local_file_path}' to '{s3_file_key}' in bucket '{destination_bucket_name}'")

    print("Upload complete.")

def main():
    config = load_config('config.yaml')
    aws_credentials = config['aws_credentials']
    s3 = authenticate_aws_s3(aws_credentials)

    source_bucket_name = config['source_bucket_name']
    source_folder = config['source_folder']
    download_location = config['download_location']

    destination_bucket_name = config['destination_bucket_name']
    destination_folder = config['destination_folder']
    upload_location = config.get('upload_location', None)

    print("Select an option:")
    print("1. Download from AWS S3 bucket")
    print("2. Upload to AWS S3 bucket")
    print("3. Download from AWS S3 bucket and Upload to another AWS S3 bucket")
    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        from_date_str = input("Enter the 'from' date (YYYY-MM-DD HH:MM:SS) or press Enter to download from the beginning: ")
        to_date_str = input("Enter the 'to' date (YYYY-MM-DD HH:MM:SS) or press Enter to download until the current date: ")
        
        from_datetime = datetime.strptime(from_date_str, "%Y-%m-%d %H:%M:%S") if from_date_str else None
        to_datetime = datetime.strptime(to_date_str, "%Y-%m-%d %H:%M:%S") if to_date_str else None
        
        print(f"Downloading files from '{source_bucket_name}/{source_folder}' in AWS S3 bucket...")
        fetch_data_from_bucket(s3, source_bucket_name, source_folder, download_location, from_datetime, to_datetime)
        print("Download complete.")

    elif choice == '2':
        print(f"Uploading files from '{upload_location}' to '{destination_bucket_name}/{destination_folder}' in AWS S3 bucket...")
        upload_folder(s3, upload_location, destination_bucket_name, destination_folder)
        print("Upload complete.")

    elif choice == '3':
        from_date_str = input("Enter the 'from' date (YYYY-MM-DD HH:MM:SS) or press Enter to download from the beginning: ")
        to_date_str = input("Enter the 'to' date (YYYY-MM-DD HH:MM:SS) or press Enter to download until the current date: ")
        
        from_datetime = datetime.strptime(from_date_str, "%Y-%m-%d %H:%M:%S") if from_date_str else None
        to_datetime = datetime.strptime(to_date_str, "%Y-%m-%d %H:%M:%S") if to_date_str else None
        
        print(f"Downloading files from '{source_bucket_name}/{source_folder}' in AWS S3 bucket...")
        fetch_data_from_bucket(s3, source_bucket_name, source_folder, download_location, from_datetime, to_datetime)
        print("Download complete.")

        print(f"Uploading files from '{upload_location}' to '{destination_bucket_name}/{destination_folder}' in AWS S3 bucket...")
        upload_folder(s3, upload_location, destination_bucket_name, destination_folder)
        print("Upload complete.")

    else:
        print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
