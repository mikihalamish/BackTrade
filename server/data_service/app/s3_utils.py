import boto3
import pandas as pd
from io import StringIO

from flask import Response


def get_s3_client():
    return boto3.client('s3', region_name='eu-north-1')


def download_csv_from_s3(bucket_name, folder_name, file_name):
    s3 = get_s3_client()
    response = s3.get_object(Bucket=bucket_name, Key=f'{folder_name}/{file_name}')
    csv_data = response['Body'].read().decode('utf-8')

    return csv_data


def list_files_in_s3(bucket_name, prefix):
    s3 = get_s3_client()
    try:
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix=prefix)
        if 'Contents' not in response:
            return []
        return [obj['Key'] for obj in response['Contents']]
    except Exception as e:
        return None


def stream_csv_from_s3(bucket_name, folder_name, file_name):
    s3 = get_s3_client()
    s3_object = s3.get_object(Bucket=bucket_name, Key=f'{folder_name}/{file_name}')
    response = s3_object['Body']

    def generate():
        for chunk in iter(lambda: response.read(1024), b''):
            yield chunk.decode('utf-8')

    return Response(generate(), mimetype='text/csv')
