# Build angular app production

FROM node:10-alpine  as phase-staging

LABEL maintainer="nguyendai.coder@gmail.com"

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

# Build nginx server

FROM nginx:alpine as phase-production

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=phase-staging /app/dist/my-app /usr/share/nginx/html

EXPOSE 4200 80

CMD [ "nginx", "-g", "daemon off;" ]

