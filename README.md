HueTube
=======

Live updating dashboard application to interact with Phillips Hue smart lighting.

Instructions:

Deployment via docker:<br/>

1) docker build -t huetube .<br/>
2) docker run -p 80:7076 -p 7076:7076 huetube
<br/>
Otherwise, run as standard MEAN stack app:<br/>

cd src<br/>
npm install<br/>
node ./app.js<br/>

Node server will be running on port 7076. App is accessible at http://localhost:7076<br/> 
Bridge port, IP, and Hue Developer ID are all configurable via src/Config.js within node. 



