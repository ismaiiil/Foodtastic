#!/bin/bash
while true
do
    sshpass -p vagrant scp -r /vagrant/Backend/.receipts vagrant@10.0.0.11:/vagrant/backup
	sleep 6h
done