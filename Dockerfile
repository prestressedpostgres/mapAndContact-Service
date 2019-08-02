FROM node:10.16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
copy . .
EXPOSE 3000
CMD ["npm","start"]