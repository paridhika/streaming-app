#### Reset kubeadm

```
kubeadm reset
apt-get update cache
sudo rm -rf .kube/ 
sudo rm -rf /etc/kubernetes/ 
sudo rm -rf /var/lib/kubelet/ 
sudo rm -rf /var/lib/etcd
sudo rm -rf /run/kubernetes
sudo rm /etc/apt/sources.list.d/kubernetes.list
systemctl daemon-reload
systemctl enable kubelet && systemctl start kubelet
```

#### see if kubelet is listening and check logs
```
netstat -natp | grep LISTEN 
journalctl -xeu kubelet
```


#### Troubleshoot and logging

```
systemctl --failed
systemctl --failed --all
systemctl reset-failed
systemctl status kubelet.service
systemctl disable kubelet.service

systemctl daemon-reload
systemctl enable kubelet && systemctl start kubelet
netstat -natp | grep LISTEN # see if kubelet is listening
journalctl -xeu kubelet

```

#### Uninstall Docker and kubernetes

```
apt-get remove docker.io, kubelet, kubectl, kubernetes-cni

```
