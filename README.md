HueTube
=======

Live updating dashboard application to interact with Phillips Hue smart lighting.

Instructions:

Deployment via docker:

1) docker build -t huetube .
2) docker run -p 80:7076 -p 7076:7076 huetube

Otherwise, run as standard MEAN stack app.

npm install
node ./app.js

Node is running on port 7076. 
Bridge port, IP, and Hue Developer ID are all configurable via src/Config.js within node. 



