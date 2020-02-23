sudo ufw allow 30000:40000/tcp
sudo ufw allow 30000:40000/udp
sudo ufw allow http
sudo allow https
sudo allow 3000
sudo allow 8001:8010/tcp
sudo allow 8001:8010/udp

scp -r pi@142.150.235.54:/home/pi/.kube /home/pi
