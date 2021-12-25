FROM node:14.18
WORKDIR /front-end-reactjs
RUN apk --update add git
COPY package.json .
RUN yarn
COPY . .
# RUN yarn build
CMD ["yarn", "start"]

