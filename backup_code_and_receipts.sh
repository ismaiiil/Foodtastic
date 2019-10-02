#!/bin/bash

set -e

#email fetched here
mail_addr=$(head -n 1 /vagrant/email.txt)
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap finish EXIT
FILE_DATE=`date '+%Y%m%d%H%M%S'`
function finish {
    if [ $? -eq 0 ]
    then
        echo "[$FILE_DATE] Backup code and receipts ran with no errors  "
        exit 0
    else
        echo "[$FILE_DATE] ${last_command} command filed with exit code $?" | mail -s "Error backup code and receipts failed" $mail_addr
        cleanup
        #send mail here
        
    fi
}

#scp -r -i ~/.ssh/id_rsa /vagrant vagrant@10.0.0.11:/home/vagrant/backup/code_receipts/$FILE_DATE
rsync -a --exclude node_modules/ /vagrant vagrant@10.0.0.11:/home/vagrant/backup/code_receipts/$FILE_DATE
