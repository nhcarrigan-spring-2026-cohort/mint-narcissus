FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3003
ENV PORT=3003
CMD ["npm", "start"]
