HueTube
=======

Live updating dashboard application to interact with Phillips Hue smart lighting.

Instructions:

Deployment via docker:

1) docker build -t huetube .
2) docker run -p 80:7076 -p 7076:7076 huetube

Otherwise, run as standard MEAN stack app:<br/>

cd src<br/>
npm install<br/>
node ./app.js<br/>

Node is running on port 7076.<br/> 
Bridge port, IP, and Hue Developer ID are all configurable via src/Config.js within node. 



