FROM node:20-alpine
WORKDIR /app
COPY services/requests-service/package*.json ./
RUN npm install --omit=dev
COPY services/requests-service/. .
COPY shared/ /shared
RUN cd /shared && npm install --omit=dev && rm -rf /app/node_modules/shared && ln -s /shared /app/node_modules/shared
EXPOSE 3003
ENV PORT=3003
CMD ["npm", "start"]
