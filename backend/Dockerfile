FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma/schema.prisma prisma/
RUN npx prisma generate


COPY . .

RUN npm run build


EXPOSE 8080

CMD ["node", "dist/index.js"]