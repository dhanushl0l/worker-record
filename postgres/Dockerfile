FROM postgres:16-alpine

ENV POSTGRES_USER=test
ENV POSTGRES_PASSWORD=test
ENV POSTGRES_DB=employees

COPY init.sql /docker-entrypoint-initdb.d/
