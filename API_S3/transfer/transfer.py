import boto3
import pandas as pd
import yaml

def load_config(file_path):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

def read_folder_names_from_excel(excel_file_path, sheet_name, column_name):
    df = pd.read_excel(excel_file_path, sheet_name=sheet_name)
    folder_names = df[column_name].tolist()
    return folder_names

def create_s3_folder(s3_client, bucket_name, parent_folder, folder_name):
    s3_folder_key = f"{parent_folder}/{folder_name}".strip('/')
    s3_client.put_object(Bucket=bucket_name, Key=s3_folder_key)
    print(f"Created S3 folder: {s3_folder_key}")
    return s3_folder_key

def move_matching_folders_to_new_s3_folders(s3_client, bucket_name, source_folder_path, destination_parent_folder, excel_folder_names):
    objects = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=source_folder_path)['Contents']
    
    for obj in objects:
        object_key = obj['Key']
        folder_name = object_key.split('/')[-2]  # Extract folder name from S3 path
        if folder_name in excel_folder_names:
            new_object_key = f"{destination_parent_folder}/{folder_name}/{object_key.split('/')[-1]}"
            s3_client.copy_object(Bucket=bucket_name, CopySource={'Bucket': bucket_name, 'Key': object_key}, Key=new_object_key)
            s3_client.delete_object(Bucket=bucket_name, Key=object_key)
            print(f"Moved '{object_key}' to '{new_object_key}'")

def main():
    # Load configuration from YAML
    config = load_config('config.yaml')
    aws_credentials = config['aws_credentials']
    excel_file_path = config['excel_file_path']
    excel_sheet_name = config['excel_sheet_name']
    excel_column_name = config['excel_column_name']
    source_folder_path = config['source_folder_path']
    destination_bucket_name = config['destination_bucket_name']
    destination_parent_folder = config['destination_parent_folder']

    # Authenticate with AWS S3
    s3_client = boto3.client('s3', aws_access_key_id=aws_credentials['access_key_id'],
                                   aws_secret_access_key=aws_credentials['secret_access_key'])

    # Read folder names from Excel
    excel_folder_names = read_folder_names_from_excel(excel_file_path, excel_sheet_name, excel_column_name)

    # Create new folders in S3 based on Excel data
    for folder_name in excel_folder_names:
        create_s3_folder(s3_client, destination_bucket_name, destination_parent_folder, folder_name)

    # Move matching folders to the new S3 folders
    move_matching_folders_to_new_s3_folders(s3_client, destination_bucket_name, source_folder_path, destination_parent_folder, excel_folder_names)

if __name__ == "__main__":
    main()
