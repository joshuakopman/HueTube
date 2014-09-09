FROM ubuntu:14.04

# Install dependencies
RUN apt-get update -y

# Clear out node js naming conflict for ubuntu
RUN apt-get --purge remove node
RUN apt-get --purge remove nodejs

#install app dependencies
RUN apt-get install -y nodejs npm git git-core

#Symbolic Node link
RUN ln -s /usr/bin/nodejs /usr/bin/node

#Set working directory
ADD ./src /srv
WORKDIR /srv

#Set NPM Repo location
RUN npm config set registry http://registry.npmjs.org/

#Install node modules
RUN npm install

#Expose node port and run app
EXPOSE 7076
CMD ["node", "./app.js"]

