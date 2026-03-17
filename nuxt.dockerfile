FROM node:20

WORKDIR /app

# copy only package files first for caching
COPY /backend/package*.json ./
RUN npm install

# mount volume in compose for live reload
COPY . .

CMD ["npm", "run", "dev"]