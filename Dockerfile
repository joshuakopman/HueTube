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

#Add project to container
ADD . /

#Set working directory
WORKDIR /src/

#Set NPM Repo location
RUN npm config set registry http://registry.npmjs.org/

#Install node modules
RUN npm install

#Install global forever module
RUN npm install forever -g

#Install global jasmine module
RUN npm install jasmine-node -g

#Run unit tests
RUN jasmine-node --junitreport spec/

#Expose port and run app
EXPOSE 7076

CMD ["forever", "./app.js"]
