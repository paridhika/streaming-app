#!/bin/sh

# Add repo list and install kubeadm
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list && \
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - && \
sudo apt-get update -q && \
sudo apt-get install -qy kubeadm

systemctl enable --now kubelet


# Enable netfilter on bridges.
sudo sysctl net.bridge.bridge-nf-call-ip6tables=1
sudo sysctl net.bridge.bridge-nf-call-iptables=1
sudo sysctl net.bridge.bridge-nf-call-arptables=1

cat <<EOF >  /etc/sysctl.d/kube.conf
net.bridge.bridge-nf-call-ip6tables=1
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-arptables=1
EOF
sysctl --system


# check if br_netfilter module is loaded
lsmod | grep br_netfilter

# if not, load it explicitly with 
modprobe br_netfilter
