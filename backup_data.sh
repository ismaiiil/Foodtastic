#!/bin/bash
#this script is ran evry 6 hour by cron

set -e

#email can easily be changed here

trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap finish EXIT

function finish {
    if [ $? -eq 0 ]
    then
        echo "Backup ran with no errors"
        exit 0
    else
        echo "${last_command} command filed with exit code $?."
        #send mail here
    fi
}
trap finish EXIT
FILE_DATE=`date '+%Y%m%d%H%M%S'`
mkdir -p /vagrant/backup
mysqldump -u root -psecret foodtastic > /vagrant/foodtastic_db_backup_$FILE_DATE.sql
rm /vagrant/foodtastic_db_backup_$FILE_DATE.sql

