# FRONTEND
FROM node:alpine AS frontend-builder
WORKDIR /frontend
ADD ./frontend ./
RUN npm install
RUN npm run build


# BACKEND
FROM golang:1.13.7-alpine AS backend-builder
ADD ./backend /src
RUN cd /src && CGO_ENABLED=0 GOOS=linux go build -o goapp


# FINAL BUILD
FROM nginx:stable-alpine
WORKDIR /app
ADD ./proxy/default.conf /etc/nginx/conf.d
COPY --from=backend-builder /src/goapp /app/
COPY --from=frontend-builder /frontend/build /usr/share/nginx/html
ADD run.sh /run.sh
EXPOSE 8080
CMD ["/bin/ash", "/run.sh"]