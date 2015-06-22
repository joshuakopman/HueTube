FROM node:0.10-onbuild

#Pull Latest Code From Repo
ADD . /

#Install global forever module
RUN npm install forever -g

#Install Gulp
RUN npm install gulp -g 

#Install global jasmine module
RUN npm install jasmine-node -g

#Run unit tests
RUN jasmine-node --junitreport spec/

#Minify
RUN gulp

#Expose port and run app
EXPOSE 7076

CMD ["forever", "./app.js"]
