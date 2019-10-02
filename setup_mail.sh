#!/bin/bash

function apt-get() { while fuser -s /var/lib/dpkg/lock; do echo 'waiting for ubuntu finish updating'; sleep 1; done; /usr/bin/apt-get "$@"; }

apt-get update
apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules -y
sudo rm /etc/postfix/main.cf
mkdir -p /etc/postfix/
cp /vagrant/tobecopied/main.cf /etc/postfix/main.cf
mkdir -p /etc/postfix/
sudo rm /etc/postfix/sasl_passwd
cp /vagrant/tobecopied/sasl_passwd /etc/postfix/sasl_passwd
sudo chmod 400 /etc/postfix/sasl_passwd
sudo postmap /etc/postfix/sasl_passwd 
cat /etc/ssl/certs/thawte_Primary_Root_CA.pem | sudo tee -a /etc/postfix/cacert.pem
sudo /etc/init.d/postfix reload

