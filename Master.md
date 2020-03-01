#### Start cluster run as root
```
sudo kubeadm config images pull -v3
sudo kubeadm init --token-ttl=0 --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address $MASTER_IP
```
#### Copy config run this as normal user
```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

export KUBECONFIG=$HOME/.kube/config

```
#### Install Weave Net plugin
```
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

### Misc Commands

- check if token is expired
```
 kubeadm token list
```
- re-create token and show join command
```
 kubeadm token create --print-join-command
 ```
