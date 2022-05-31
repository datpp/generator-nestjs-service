FROM node:14 as build
    
# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies and Build app source
RUN yarn install && yarn build

FROM node:lts-alpine

WORKDIR /app

#RUN npm install pm2 -g
    
#COPY ./ecosystem.config.js ./ecosystem.config.js
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 80
CMD [ "node", "dist/main.js" ]
