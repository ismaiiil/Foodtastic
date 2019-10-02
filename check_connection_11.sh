#!/bin/bash

FILE_DATE=`date '+%Y%m%d%H%M%S'`
#email fetched here
mail_addr=$(head -n 1 /vagrant/email.txt)

if [ "`ping -c 1 10.0.0.10`" != 1 ];
then
    echo "[$FILE_DATE] Web server successfully pinged"
    #echo "[$FILE_DATE] Web server at 10.0.0.10  is reacheable" | mail -s "Sucess pingin webserver" $mail_addr
else
    echo "[$FILE_DATE] Web server at 10.0.0.10 may be unreachable for the moment"
    echo "[$FILE_DATE] Web server at 10.0.0.10 may be unreachable for the moment" | mail -s "Error Webserver unreachable" $mail_addr
fi