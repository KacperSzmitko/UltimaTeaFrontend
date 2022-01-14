FROM node:14.18.1
WORKDIR /app
COPY package.json .
RUN npm install
COPY ./public ./public
COPY ./src ./src
COPY ./run.sh .
# CMD ["npm", "start"]
ENTRYPOINT ["sh", "./run.sh"]

