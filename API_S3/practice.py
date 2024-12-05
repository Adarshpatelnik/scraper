import boto3

# AWS S3 credentials
aws_access_key_id = "AKIASQ3IHIRASRMSEOGZ"
aws_secret_access_key = "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"

# Source and destination details
source_bucket_name = "adarshb2b"
source_folder = "Download/"
destination_bucket_name = "adarshb2b"
destination_folder = "Upload/"

# Create S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)

# Define the source and destination paths
source_path = f"{source_folder}"
destination_path = f"{destination_folder}"

# Copy object from source bucket to destination bucket
s3_client.copy_object(
    Bucket=destination_bucket_name,
    CopySource={'Bucket': source_bucket_name, 'Key': source_path},
    Key=destination_path
)

print("Object copied successfully.")
