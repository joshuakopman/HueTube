HueTube
=======

Live updating dashboard application to interact with Phillips Hue smart lighting.

Instructions:

Run via Docker:<br/>

1) docker build -t huetube .<br/>
2) docker run -p 80:7076 -p 7076:7076 huetube
<br/>

Run directly as node app:<br/>

1) cd src<br/>
2) npm install<br/>
3) node ./app.js<br/>

Node server will be running on port 7076. App is accessible at http://localhost:7076<br/> 
Bridge port, IP, and Hue Developer ID are all configurable via src/Config.js within node. 



