FROM node:20-alpine
WORKDIR /app
COPY services/messaging-service/package*.json ./
RUN npm install --omit=dev
COPY services/messaging-service/. .
COPY shared/ /shared
RUN cd /shared && npm install --omit=dev && rm -rf /app/node_modules/shared && ln -s /shared /app/node_modules/shared
EXPOSE 3004
ENV PORT=3004
CMD ["npm", "start"]
