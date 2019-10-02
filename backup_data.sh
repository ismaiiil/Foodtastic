#!/bin/bash

set -e

#email fetched here
mail=$(head -n 1 /vagrant/email.txt)
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG

# echo an error message before exiting
trap finish EXIT

FILE_DATE=`date '+%Y%m%d%H%M%S'`
function cleanup {
    rm /vagrant/foodtastic_db_backup_$FILE_DATE.sql
}

function finish {
    if [ $? -eq 0 ]
    then
        echo "[$FILE_DATE] Backup data ran with no errors "
        exit 0
    else
        echo "[$FILE_DATE] ${last_command} command filed with exit code $?. sending mail to $mail"
        cleanup
        #send mail here
    fi
}


mkdir -p /vagrant/backup
mysqldump -u root -psecret foodtastic > /vagrant/foodtastic_db_backup_$FILE_DATE.sql
scp -i ~/.ssh/id_rsa /vagrant/foodtastic_db_backup_$FILE_DATE.sql vagrant@10.0.0.11:/home/vagrant/backup/data/foodtastic_db_backup_$FILE_DATE.sql
cleanup

