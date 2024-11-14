# docker build -t social-network:latest .
FROM node

LABEL authors="Duelist"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview", "--", "--host"]

LABEL authors="Dan"

# docker run -p 3000:3000 social-network