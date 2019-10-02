# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

config.vm.provision "shell", inline: <<-SHELL
  systemctl disable apt-daily.service
  systemctl disable apt-daily.timer
  chmod +x /vagrant/setup_mail.sh
SHELL

  setup_sql = <<'SCRIPT'
#wait for myql to start up
# Wait for mysql to start up
until mysqladmin ping -psecret; do
	sleep 2
done

mysql -u root -e 'DROP DATABASE IF EXISTS foodtastic' -psecret
mysql -u root -e 'CREATE DATABASE foodtastic' -psecret
mysql -u root -e "CREATE USER 'foodtastic'@'%' identified by 'foodtastic'" -psecret
mysql -u root -psecret foodtastic < /vagrant/Backend/SQL/create_tables.sql
mysql -u root -e  "ALTER USER 'foodtastic' IDENTIFIED BY 'foodtastic';" -psecret
mysql -u root -psecret -e "GRANT ALL PRIVILEGES ON foodtastic.* TO 'foodtastic'@'%';"
mysql -u root -psecret -e "FLUSH PRIVILEGES;"
mysql -u root -psecret foodtastic < /vagrant/Backend/SQL/seed_tables.sql

SCRIPT

  setup_nginx = <<'SCRIPT'
#remove default nginx config
sudo rm /etc/nginx/sites-available/default
#copy nginx congfig file from host to destination
sudo cp /vagrant/tobecopied/default /etc/nginx/sites-available/default
#restart services
sudo service nginx restart && sudo service php7.1-fpm restart

SCRIPT

  setup_images = <<'SCRIPT'
#copy images to destination folder
sudo cp -a /vagrant/tobecopied/seedimages/. /vagrant/Backend/.images

SCRIPT

update = <<'SCRIPT'
systemctl disable apt-daily.service
systemctl disable apt-daily.timer
apt-get update
sudo npm cacheclean -f
sudo npm install n -g
sudo n stable

SCRIPT

serve = <<'SCRIPT'
cd /vagrant/frontend
sudo npm install serve -g
cd /vagrant/frontend && npm install
npm run build
cd /vagrant

SCRIPT

#note that by default cron jobs will be added to root user since
#vagrant provision runs at an elevated right
prepare_backup_10 = <<'SCRIPT'

cd /vagrant
chmod +x backup_code_and_receipts.sh
chmod +x backup_data.sh
chmod +x check_connection_10.sh
crontab cronjob_10

SCRIPT

prepare_backup_11 = <<'SCRIPT'

cd /vagrant
chmod +x check_connection_11.sh
mkdir -p /home/vagrant/backup/code_receipts
mkdir -p /home/vagrant/backup/data
crontab cronjob_11

SCRIPT

  config.vm.define "web" do |web|   
    web.vm.box = "brownell/xenial64lemp"
    web.vm.network :private_network, ip: "10.0.0.10"
    web.vm.network "forwarded_port", guest: 3306, host: 3306, protocol: "tcp"
  script = ''
  
  script += update
  script += setup_sql
  script += setup_nginx
  script += setup_images
  script += serve
  script += prepare_backup_10
  web.vm.provision :shell, :inline => script

  end

  config.vm.define "backup" do |backup|
    backup.vm.box = "brownell/xenial64lemp"
    backup.vm.network :private_network, ip: "10.0.0.11"
    script = ''
    script += update
    script += prepare_backup_11
    backup.vm.provision :shell, :inline => script
  end

 config.vm.provision "file", source: "./id_rsa", destination: "/home/vagrant/.ssh/id_rsa"
 public_key = File.read("./id_rsa.pub")

 config.vm.provision :shell, :inline =>"
     echo 'Copying web public SSH Keys to the VM'
     mkdir -p /home/vagrant/.ssh
     chmod 700 /home/vagrant/.ssh
     echo '#{public_key}' >> /home/vagrant/.ssh/authorized_keys
     chmod -R 600 /home/vagrant/.ssh/authorized_keys
     echo 'Host 10.0.*.*' >> /home/vagrant/.ssh/config
     echo 'StrictHostKeyChecking no' >> /home/vagrant/.ssh/config
     echo 'UserKnownHostsFile /dev/null' >> /home/vagrant/.ssh/config
     chmod -R 600 /home/vagrant/.ssh/config
     ", privileged: false
  
end

