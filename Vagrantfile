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
  end

  config.vm.define "backup" do |backup|
    backup.vm.box = "brownell/xenial64lemp"
    backup.vm.network :private_network, ip: "10.0.0.11"
  end

  update = <<'SCRIPT'
# update system before we install anything
sudo apt-get update && sudo apt-get -y upgrade 
SCRIPT

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


  script = ''
  #script += update
  script += setup_sql
  config.vm.provision :shell, :inline => script

end
