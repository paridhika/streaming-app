sudo ufw allow 30000:40000/tcp
sudo ufw allow 30000:40000/udp

scp -r pi@142.150.235.54:/home/pi/.kube /home/pi
