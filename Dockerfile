FROM node:22-alpine
LABEL org.opencontainers.image.source=https://github.com/kristjanjansen/mfe-api

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.ts ./

ENV PORT=4000
EXPOSE 4000

CMD ["node", "server.ts"]
