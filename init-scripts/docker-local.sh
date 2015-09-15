docker stop $(docker ps -aq)

docker rm $(docker ps -aq)

docker rmi $(docker images -q)

docker run -d --name mongodb mongo

docker build -t huetube .

cd ..

docker run  -v /Users/jkopman/huetubeconfiguration/:/mnt --link mongodb:mongodb -p 80:7076 -p 7076:7076 -d --name huetubecontainer huetube

docker exec -it huetubecontainer cp ../../../mnt/salt.txt . 

docker exec -it huetubecontainer cp ../../../mnt/Config.js .

exit