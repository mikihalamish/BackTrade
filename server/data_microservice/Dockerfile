FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -v -r requirements.txt
COPY . .
CMD [ "python", "./app/routes.py" ]

