#### Install recommended OS on Raspberry Pi using NOOBS 
- https://www.raspberrypi.org/downloads/noobs/

#### Add the following to /etc/dhcpcd.conf to set static IP addresses
```

  interface eth0
  static ip_address=142.150.235.59
  static routers=142.150.235.1
  static domain_name_servers=128.100.100.128

  interface wlan0
  static ip_address=192.168.0.11
  static routers=192.168.0.1
  static domain_name_servers=192.168.0.1
  
  ```
  
  #### Edit Raspberry pi host name
  
  - https://blog.jongallant.com/2017/11/raspberrypi-change-hostname/
  
#### Install prerequisite packages 
  - upgate and upgrade
  - disable firewall (ufw)

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install apt-transport-https ca-certificates software-properties-common selinux-utils ufw -y
sudo ufw disable
```

#### Install weave CNI plugin

```
sudo curl -L git.io/weave -o /usr/local/bin/weave
sudo chmod a+x /usr/local/bin/weave
export CHECKPOINT_DISABLE=1
sudo mkdir -p /opt/cni/bin
sudo mkdir -p /etc/cni/net.d
```
#### Enabling cgroup 

```
echo Adding " cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory" to /boot/cmdline.txt
sudo cp /boot/cmdline.txt /boot/cmdline_backup.txt
orig="$(head -n1 /boot/cmdline.txt) cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"
echo $orig | sudo tee /boot/cmdline.txt

```

#### reboot to apply changes
```
reboot
setenforce 0

```
