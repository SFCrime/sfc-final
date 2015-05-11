FROM python:2.7

RUN mkdir app
ADD dist app
WORKDIR /app

EXPOSE 800

CMD ["python", "-m", "SimpleHTTPServer", "800"]
