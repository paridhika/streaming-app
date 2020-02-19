#!/bin/sh
sudo kubeadm config images pull -v3
sudo kubeadm init --token-ttl=0

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install Weave Net
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"


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

# Install Flannel
# kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.11.0/Documentation/kube-flannel.yml

kubectl apply -f https://github.com/kubernetes/cloud-provider-openstack/raw/release-1.15/cluster/addons/rbac/cloud-controller-manager-roles.yaml
kubectl apply -f https://github.com/kubernetes/cloud-provider-openstack/raw/release-1.15/cluster/addons/rbac/cloud-controller-manager-role-bindings.yaml

# check if token is expired
kubeadm token list

# re-create token and show join command
kubeadm token create --print-join-command
