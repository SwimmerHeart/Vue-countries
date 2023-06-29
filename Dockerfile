#//////////////////////
#       build
# ////////////////////

FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

#///////////////////////////
#       Production
#///////////////////////////

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
#c ENTRYPOINT
COPY --from=build-stage /app/entrypoint.sh /usr/local/bin/entrypoint.sh

COPY --from=build-stage /app/dist /usr/share/nginx/html

#c ENTRYPOINT
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

#CMD nginx -g "daemon off;"
ENTRYPOINT ["sh", "/usr/local/bin/entrypoint.sh"]