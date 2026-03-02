FROM node:20-alpine
WORKDIR /app
COPY services/auth-service/package*.json ./
RUN npm install --omit=dev
COPY services/auth-service/. .
COPY shared/ /shared
RUN cd /shared && npm install --omit=dev && rm -rf /app/node_modules/shared && ln -s /shared /app/node_modules/shared
EXPOSE 3001
ENV PORT=3001
CMD ["npm", "start"]
