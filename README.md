HueTube
=======

Live updating dashboard application to interact with Phillips Hue smart lighting.

Instructions:


Option 1: Run using Docker:<br/>

1) Utilize one of the sample bash scripts /init-scripts to pull and run the latest DockerHub image or build a local image via the Dockerfile.<br/>

2) Update the Config.js with your local IP and Phillips Hue developer name.<br/>

3) Replace the salt.txt file contents with your desired Admin password.<br/>

<br/>

Option 2: Run directly as a MEAN stack app:<br/>

*Start Mongo Db Server /path/to/mongod --dbpath /data<br/>
1) Update the Config.js with your local IP and Phillips Hue developer name.<br/>
2) Replace the salt.txt file contents with your desired Admin password.<br/>
3) cd src<br/>
4) npm install<br/>
5) gulp<br/>
6) node ./app.js<br/>

Node server will be running on port 7076. App is locally accessible at http://localhost:7076<br/> 
Bridge port, IP, and Hue Developer ID are all configurable via src/Config.js within node. <br/>



