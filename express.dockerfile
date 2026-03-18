FROM node:20

WORKDIR /app

# package.json & package-lock.json
COPY /backend/package*.json ./
RUN npm install

# mount volume in compose for live reload
COPY backend ./

CMD ["npm", "run", "dev"]