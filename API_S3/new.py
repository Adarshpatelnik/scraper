import os
import boto3
import yaml
import pandas as pd

def load_config(file_path):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

def authenticate_aws_s3(aws_credentials):
    return boto3.client('s3', aws_access_key_id=aws_credentials['access_key_id'], 
                        aws_secret_access_key=aws_credentials['secret_access_key'])

def list_objects_in_folder(s3, bucket_name, folder_path):
    objects = []
    paginator = s3.get_paginator('list_objects_v2')
    for result in paginator.paginate(Bucket=bucket_name, Prefix=folder_path):
        if 'Contents' in result:
            for obj in result['Contents']:
                objects.append(obj['Key'])
    return objects

def download_files_from_s3(s3, bucket_name, file_paths, download_location):
    for file_path in file_paths:
        try:
            folder_path, _ = os.path.split(file_path)
            print("Listing files in folder:", folder_path)  # Debug print
            objects = list_objects_in_folder(s3, bucket_name, folder_path)
            for obj in objects:
                download_file(s3, bucket_name, obj, download_location)
        except Exception as e:
            print(f"Failed to list files in folder '{folder_path}': {str(e)}")

def download_file(s3, bucket_name, object_key, download_location):
    file_name = os.path.basename(object_key)
    file_path = os.path.join(download_location, file_name)
    try:
        s3.download_file(bucket_name, object_key, file_path)
        print(f"Downloaded '{object_key}' to '{file_path}'")
    except Exception as e:
        print(f"Failed to download '{object_key}': {str(e)}")

def main():
    config = load_config('config.yaml')
    aws_credentials = config['aws_credentials']
    s3 = authenticate_aws_s3(aws_credentials)

    source_bucket_name = config['source_bucket_name']
    file_paths_excel = config['file_paths_excel']
    download_location = config['download_location']

    try:
        df = pd.read_excel(file_paths_excel, header=None)  # Read Excel file without header
        print(df.head())  # Print the first few rows of the DataFrame
        file_paths = df[0].tolist()  # Assuming the file paths are in the first column
    except Exception as e:
        print(f"Failed to read file paths from Excel: {str(e)}")
        return

    print(f"Downloading files from '{source_bucket_name}' in AWS S3 bucket...")
    download_files_from_s3(s3, source_bucket_name, file_paths, download_location)
    print("Download complete.")

if __name__ == "__main__":
    main()
