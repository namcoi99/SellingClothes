FROM node:10.15.3

# set working directory
RUN mkdir /usr/src/app
# copy all files from current directory to docker
COPY . /usr/src/app

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install
RUN npm rebuild node-sass

CMD ["npm","start"]