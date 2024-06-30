import gspread
from oauth2client.service_account import ServiceAccountCredentials
from googleapiclient.discovery import build

def get_google_sheet(spreadsheet_name, worksheet_name):
    scope = [
        "https://spreadsheets.google.com/feeds",
        "https://www.googleapis.com/auth/drive"
    ]

    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)
    sheet = client.open(spreadsheet_name)
    worksheet = sheet.worksheet(worksheet_name)
    return worksheet

def get_data_from_sheet(spreadsheet_name, worksheet_name):
    worksheet = get_google_sheet(spreadsheet_name, worksheet_name)
    return worksheet.get_all_records()

def list_available_data_in_drive():
    scope = ["https://www.googleapis.com/auth/drive.metadata.readonly"]
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    drive_service = build('drive', 'v3', credentials=creds)

    results = drive_service.files().list(
        q="mimeType='application/vnd.google-apps.spreadsheet'",
        pageSize=10, fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])
    return items
