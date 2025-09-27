FROM node:22

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build
RUN yarn global add serve 

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]