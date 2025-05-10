FROM node:22.15.0-bullseye-slim as dev

WORKDIR /home/node/app

USER root

COPY ./src /home/node/app
RUN chown -R node:node /home/node/app

USER node