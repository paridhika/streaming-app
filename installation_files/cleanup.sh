unset http_proxy https_proxy
sudo rm -rf .kube/
sudo rm -rf /etc/kubernetes/
sudo rm -rf /var/lib/kubelet/
sudo rm -rf /var/lib/etcd
systemctl daemon-reload
systemctl enable kubelet && systemctl start kubelet




netstat -natp | grep LISTEN

systemctl daemon-reload
systemctl stop kubelet
systemctl stop docker
systemctl stop iptables
systemctl start iptables
systemctl start docker
systemctl start kubelet

systemctl status kubelet

