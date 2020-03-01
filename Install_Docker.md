## Docker Installation on Raspberry Pi 3 (arm/64)

```
curl -sSL get.docker.com | sh && \
sudo usermod pi -aG docker && \
newgrp docker

sudo apt-get update
sudo apt-get upgrade

systemctl start docker.service
docker info
```

## Disable Swap
```
sudo dphys-swapfile swapoff && \
sudo dphys-swapfile uninstall && \
sudo update-rc.d dphys-swapfile remove
```
- or
```
sudo swapoff -a
```
- swap check should return empty
```
sudo swapon --summary

```
#### Create /etc/docker directory.
```
mkdir /etc/docker
```
#### Configure the Docker daemon
```
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ]
}
EOF

mkdir -p /etc/systemd/system/docker.service.d
```

#### Restart Docker
```
systemctl daemon-reload
systemctl restart docker
systemctl enable docker
```
