import os
import yaml
from datetime import datetime
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

def load_config(file_path):
    with open(file_path, 'r') as file:
        config = yaml.safe_load(file)
    return config

def authenticate_google_drive(client_secret_file):
    flow = InstalledAppFlow.from_client_secrets_file(client_secret_file, ['https://www.googleapis.com/auth/drive'])
    credentials = flow.run_local_server(port=0)
    return credentials

def create_drive_service(credentials):
    service = build('drive', 'v3', credentials=credentials)
    return service

def fetch_data_from_folder(service, folder_id, download_location, from_datetime=None, to_datetime=None):
    results = service.files().list(q=f"'{folder_id}' in parents", fields="files(id, name, mimeType, createdTime)").execute()
    items = results.get('files', [])

    if not items:
        print('No files found.')
    else:
        for item in items:
            file_id = item['id']
            file_name = item['name']
            mime_type = item['mimeType']
            created_time = item.get('createdTime')

            if mime_type == 'application/vnd.google-apps.folder':
                folder_path = os.path.join(download_location, file_name)
                os.makedirs(folder_path, exist_ok=True)
                fetch_data_from_folder(service, file_id, folder_path, from_datetime, to_datetime)
            elif created_time:
                created_datetime = datetime.strptime(created_time, "%Y-%m-%dT%H:%M:%S.%fZ")
                if from_datetime <= created_datetime <= to_datetime:
                    download_file(service, file_id, file_name, download_location)

def download_file(service, file_id, file_name, download_location):
    request = service.files().get_media(fileId=file_id)
    file_path = os.path.join(download_location, file_name)
    with open(file_path, 'wb') as file:
        downloader = request.execute()
        file.write(downloader)

def upload_folder(service, folder_path, parent_id):
    folder_metadata = {
        'name': os.path.basename(folder_path),
        'mimeType': 'application/vnd.google-apps.folder',
        'parents': [parent_id]
    }
    folder = service.files().create(body=folder_metadata, fields='id').execute()
    folder_id = folder.get('id')

    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        if os.path.isfile(item_path):
            upload_file(service, item_path, folder_id)
        elif os.path.isdir(item_path):
            upload_folder(service, item_path, folder_id)

def upload_file(service, file_path, folder_id):
    file_metadata = {'name': os.path.basename(file_path), 'parents': [folder_id]}
    media = MediaFileUpload(file_path, resumable=True)
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print('File ID: %s' % file.get('id'))

def main():
    config = load_config('config.yaml')
    google_drive_config = config['google_drive']

    credentials = authenticate_google_drive(google_drive_config['client_secret_file'])
    service = create_drive_service(credentials)

    print("Select an option:")
    print("1. Download from Google Drive")
    print("2. Upload to Google Drive")
    print("3. Download from Google Drive and Upload to Google Drive")

    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        print("Select a folder from Google Drive to download:")
        print("1. Use the provided folder ID")
        print("2. Specify a new folder ID")

        download_folder_choice = input("Enter your choice (1/2): ")

        if download_folder_choice == '1':
            download_folder_id = google_drive_config['folder_id']
        elif download_folder_choice == '2':
            download_folder_id = input("Enter the folder ID to download: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        print("Select a folder to download to:")
        print("1. Use the provided folder")
        print("2. Specify a new folder")

        download_location_choice = input("Enter your choice (1/2): ")

        if download_location_choice == '1':
            download_location = google_drive_config['download_location']
        elif download_location_choice == '2':
            download_location = input("Enter the new download folder path: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        while True:
            from_datetime_str = input("Enter the from datetime (YYYY-MM-DD HH:MM:SS): ")
            to_datetime_str = input("Enter the to datetime (YYYY-MM-DD HH:MM:SS): ")

            try:
                from_datetime = datetime.strptime(from_datetime_str, "%Y-%m-%d %H:%M:%S")
                to_datetime = datetime.strptime(to_datetime_str, "%Y-%m-%d %H:%M:%S")
                if from_datetime > to_datetime:
                    print("Error: 'From datetime' should be earlier than 'To datetime'.")
                    continue
                break
            except ValueError:
                print("Invalid datetime format. Please enter the datetime in the format: YYYY-MM-DD HH:MM:SS")

        fetch_data_from_folder(service, download_folder_id, download_location, from_datetime, to_datetime)

    elif choice == '2':
        print("Select a folder from Google Drive to upload:")
        print("1. Use the provided folder ID")
        print("2. Specify a new folder ID")

        folder_choice = input("Enter your choice (1/2): ")

        if folder_choice == '1':
            folder_id = google_drive_config['upload_folder_id']
        elif folder_choice == '2':
            folder_id = input("Enter the folder ID: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        print("Select a folder to upload to Google Drive:")
        print("1. Use the provided folder")
        print("2. Specify a new folder")

        upload_folder_choice = input("Enter your choice (1/2): ")

        if upload_folder_choice == '1':
            folder_to_upload = google_drive_config['upload_folder']
        elif upload_folder_choice == '2':
            folder_to_upload = input("Enter the folder path to upload: ")
            folder_id_to_upload = input("Enter the folder ID to upload to: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        upload_folder(service, folder_to_upload, folder_id_to_upload)

    elif choice == '3':
        print("Select a folder from Google Drive to download:")
        print("1. Use the provided folder ID")
        print("2. Specify a new folder ID")

        download_folder_choice = input("Enter your choice (1/2): ")

        if download_folder_choice == '1':
            download_folder_id = google_drive_config['folder_id']
        elif download_folder_choice == '2':
            download_folder_id = input("Enter the folder ID to download: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        print("Select a folder to download to:")
        print("1. Use the provided folder")
        print("2. Specify a new folder")

        download_location_choice = input("Enter your choice (1/2): ")

        if download_location_choice == '1':
            download_location = google_drive_config['download_location']
        elif download_location_choice == '2':
            download_location = input("Enter the new download folder path: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        while True:
            from_datetime_str = input("Enter the from datetime (YYYY-MM-DD HH:MM:SS): ")
            to_datetime_str = input("Enter the to datetime (YYYY-MM-DD HH:MM:SS): ")

            try:
                from_datetime = datetime.strptime(from_datetime_str, "%Y-%m-%d %H:%M:%S")
                to_datetime = datetime.strptime(to_datetime_str, "%Y-%m-%d %H:%M:%S")
                if from_datetime > to_datetime:
                    print("Error: 'From datetime' should be earlier than 'To datetime'.")
                    continue
                break
            except ValueError:
                print("Invalid datetime format. Please enter the datetime in the format: YYYY-MM-DD HH:MM:SS")

        fetch_data_from_folder(service, download_folder_id, download_location, from_datetime, to_datetime)

        print("Select a folder from Google Drive to upload:")
        print("1. Use the provided folder ID")
        print("2. Specify a new folder ID")

        upload_folder_choice = input("Enter your choice (1/2): ")

        if upload_folder_choice == '1':
            folder_id_to_upload = google_drive_config['upload_folder_id']
        elif upload_folder_choice == '2':
            folder_id_to_upload = input("Enter the folder ID to upload to: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        print("Select a folder to upload to Google Drive:")
        print("1. Use the provided folder")
        print("2. Specify a new folder")

        upload_location_choice = input("Enter your choice (1/2): ")

        if upload_location_choice == '1':
            folder_to_upload = google_drive_config['upload_folder']
        elif upload_location_choice == '2':
            folder_to_upload = input("Enter the folder path to upload: ")
        else:
            print("Invalid choice. Please enter 1 or 2.")
            return

        upload_folder(service, folder_to_upload, folder_id_to_upload)

    else:
        print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
