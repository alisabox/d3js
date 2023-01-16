FROM node

WORKDIR /client

COPY package.json /client

RUN npm install

COPY . /client

EXPOSE 80

CMD ["npm", "start"]