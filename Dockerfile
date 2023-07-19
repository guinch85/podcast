FROM keymetrics/pm2:18-buster

# Bundle APP files
COPY ./src src/
#COPY ./external external/
COPY package.json .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

RUN yarn install --production

# Show current folder structure in logs
RUN ls -al

EXPOSE 3000/tcp

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production" ]