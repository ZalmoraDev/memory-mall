FROM node:20

WORKDIR /app

# package.json & package-lock.json
COPY /frontend/package*.json ./
RUN npm install

# mount volume in compose for live reload
COPY frontend ./

CMD ["npm", "run", "dev"]