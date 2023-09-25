FROM node:18-alpine

WORKDIR /

COPY ./interpreter/* ./interpreter/
COPY index.js ./
COPY ./var/rinha/source.rinha.json /var/rinha/source.rinha.json

CMD [ "node", "index.js" ]