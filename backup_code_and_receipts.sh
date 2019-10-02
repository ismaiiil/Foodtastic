#!/bin/bash
FILE_DATE=`date '+%Y%m%d%H%M%S'`
scp -r -i ~/.ssh/id_rsa /vagrant/Backend/.receipts vagrant@10.0.0.11:/vagrant/code$FILE_DATE


