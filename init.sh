sudo docker stop $(sudo docker ps -aq)

sudo docker rm $(sudo docker ps -aq)

sudo docker run -itd -p 27017:27017 --name mongodb mongo

sudo docker run  --link mongodb:mongodb -p 80:7076 -p 7076:7076 -i aesopwaits/huetube