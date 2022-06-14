FROM node:16-alpine as build
WORKDIR /app
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# https://medium.com/swlh/dockerizing-a-react-application-with-docker-and-nginx-19e88ef8e99a
