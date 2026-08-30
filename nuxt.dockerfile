FROM node:24

WORKDIR /app

COPY package*.json ./
COPY frontend ./frontend
COPY shared ./shared

RUN npm install

WORKDIR /app/frontend
CMD ["npm", "run", "dev"]