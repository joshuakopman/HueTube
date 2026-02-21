HueTube
=======

Live updating dashboard application to interact with Phillips Hue smart lighting.

Instructions:


Option 1: Run using Docker:<br/>

1) Utilize one of the sample bash scripts /init-scripts to pull and run the latest DockerHub image or build a local image via the Dockerfile.<br/>

2) Update the Config.js with your local IP and Phillips Hue developer name.<br/>

3) Replace the salt.txt file contents with your desired Admin password.<br/>
4) (Optional) use env vars instead of editing Config.js:
   - `HUE_BRIDGE_HOST` (bridge IP)
   - `HUE_API_URI` (example: `/api/<your-hue-username>`)
   - `HUE_PORT` (default `80`)
   - `MONGO_HOST`, `MONGO_DB`
   - `PORT` / `NODE_PORT`<br/>

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

Notes:
- This app was designed to keep real Hue credentials out of Git by mounting a host `Config.js` and `salt.txt` into the container.
- Wemo integration is optional; if the old Wemo dependency fails to load on newer Node versions, Hue routes still start.


