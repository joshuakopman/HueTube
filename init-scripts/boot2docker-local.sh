boot2docker init

boot2docker start

export DOCKER_TLS_VERIFY=1

export DOCKER_HOST=tcp://192.168.59.103:2376

export DOCKER_CERT_PATH=/Users/jkopman/.boot2docker/certs/boot2docker-vm

docker stop $(docker ps -aq)

docker rm $(docker ps -aq)

docker rmi $(docker images -q)

docker run -d --name mongodb mongo

cd ..

docker build -t huetube .

docker run  -v /Users/jkopman/huetubeconfiguration/:/mnt --link mongodb:mongodb -p 80:7076 -p 7076:7076 -d --name huetubecontainer huetube

docker exec -it huetubecontainer cp ../../../mnt/salt.txt . 

docker exec -it huetubecontainer cp ../../../mnt/Config.js .

exit