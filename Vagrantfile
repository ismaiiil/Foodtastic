# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.define "web" do |web|   
    web.vm.box = "brownell/xenial64lemp"
    web.vm.network :private_network, ip: "10.0.0.10"
    web.vm.network "forwarded_port", guest: 3306, host: 3306, protocol: "tcp"


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
# update system before we install anything
sudo apt-get update && sudo apt-get -y upgrade 
SCRIPT

  script = ''
  script += setup_sql
  script += setup_nginx
  script += setup_images
  web.vm.provision :shell, :inline => script



  end

  config.vm.define "backup" do |backup|
    backup.vm.box = "brownell/xenial64lemp"
    backup.vm.network :private_network, ip: "10.0.0.11"
  end


end
