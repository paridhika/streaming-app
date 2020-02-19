#!/bin/sh
# prerequisites

sudo apt-get install apt-transport-https ca-certificates software-properties-common -y
sudo apt install selinux-utils
sudo apt-get install ufw
sudo ufw disable
sudo curl -L git.io/weave -o /usr/local/bin/weave
sudo chmod a+x /usr/local/bin/weave
export CHECKPOINT_DISABLE=1
mkdir -p /opt/cni/bin
mkdir -p /etc/cni/net.d

echo Adding " cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory" to /boot/cmdline.txt
sudo cp /boot/cmdline.txt /boot/cmdline_backup.txt
orig="$(head -n1 /boot/cmdline.txt) cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"
echo $orig | sudo tee /boot/cmdline.txt

reboot
setenforce 0

# Install Docker
curl -sSL get.docker.com | sh && \
sudo usermod pi -aG docker && \
newgrp docker

sudo curl https://download.docker.com/linux/raspbian/gpg

echo "deb https://download.docker.com/linux/raspbian/ stretch stable" >> /etc/apt/sources.list
sudo apt-get update
sudo apt-get upgrade

systemctl start docker.service
docker info

# Disable Swap
sudo dphys-swapfile swapoff && \
sudo dphys-swapfile uninstall && \
sudo update-rc.d dphys-swapfile remove

sudo swapon --summary

weave setup
