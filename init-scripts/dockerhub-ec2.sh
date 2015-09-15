sudo docker stop $(sudo docker ps -aq)
 
sudo docker rm $(sudo docker ps -aq)
 
sudo docker rmi $(sudo docker images -q)
 
sudo docker run -d --name mongodb mongo
 
sudo docker run  -v /home/ec2-user/:/mnt --link mongodb:mongodb -p 80:7076 -p 7076:7076 -d --name huetubecontainer aesopwaits/huetube
 
sudo docker exec -it huetubecontainer cp ../../../mnt/salt.txt . 
 
sudo docker exec -it huetubecontainer cp ../../../mnt/Config.js .

exit