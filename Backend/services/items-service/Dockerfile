FROM node:20-alpine
WORKDIR /app
COPY services/items-service/package*.json ./
RUN npm install --omit=dev
COPY services/items-service/. .
COPY shared/ /shared
RUN cd /shared && npm install --omit=dev && rm -rf /app/node_modules/shared && ln -s /shared /app/node_modules/shared
EXPOSE 3002
ENV PORT=3002
CMD ["npm", "start"]
