from s3_utils import download_csv_from_s3, list_files_in_s3, stream_csv_from_s3


def fetch_historical_data(bucket_name, dte, date):
    folder_name = f'ivol/all_dte_raw_data/{dte}dte'
    file_name = f'{date}.csv'
    csv_data = download_csv_from_s3(bucket_name, folder_name, file_name)
    return csv_data


def stream_historical_data(bucket_name, dte, date):
    folder_name = f'ivol/all_dte_raw_data/{dte}dte'
    file_name = f'{date}.csv'
    return stream_csv_from_s3(bucket_name, folder_name, file_name)


def list_available_data(bucket_name, dte=None, start_date=None, end_date=None):
    if dte:
        prefix = f'ivol/all_dte_raw_data/{dte}dte/'
    else:
        prefix = 'ivol/all_dte_raw_data/'

    files = list_files_in_s3(bucket_name, prefix)
    if files is None:
        return None

    if start_date and end_date:
        files = [file for file in files if start_date <= file.split('/')[-1].replace('.csv', '') <= end_date]

    return files
