FROM node:20-alpine
WORKDIR /app
COPY services/gateway/package*.json ./
RUN npm install --omit=dev
COPY services/gateway/. .
COPY shared/ /shared
EXPOSE 8080
ENV PORT=8080
CMD ["npm", "start"]
