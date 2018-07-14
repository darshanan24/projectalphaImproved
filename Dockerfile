FROM node:latest

LABEL author="Sandesh K"

ENV NODE_ENV=development
ENV PORT=3000

# Copy to app directory
COPY . /usr/app
# Create app directory
WORKDIR /usr/app

RUN npm install

EXPOSE $PORT
ENTRYPOINT [ "npm", "start" ]
