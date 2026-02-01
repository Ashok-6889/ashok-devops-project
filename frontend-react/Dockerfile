# ---------- Build stage ----------
FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Build React app
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
