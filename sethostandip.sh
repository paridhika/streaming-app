#!/bin/sh

hostname=$1 #Robson
ip=$2 # should be of format: 192.168.1.100
dns=$3 # should be of format: 192.168.1.1

# Change the hostname
sudo hostnamectl --transient set-hostname $hostname
sudo hostnamectl --static set-hostname $hostname
sudo hostnamectl --pretty set-hostname $hostname
sudo sed -i s/raspberrypi/$hostname/g /etc/hosts


# Set the static ip

sudo cat <<EOT >> /etc/dhcpcd.conf
interface eth0
static ip_address=$ip #142.150.235.59
static routers=$dns #142.150.235.1
static domain_name_servers=$domain #128.100.100.128

interface wlan0
static ip_address=192.168.0.11
static routers=192.168.0.1
static domain_name_servers=192.168.0.1
EOT
