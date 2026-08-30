FROM node:24

WORKDIR /app

COPY package*.json ./
COPY backend ./backend
COPY shared ./shared

RUN npm install

WORKDIR /app/backend

CMD ["npm", "run", "dev"]