 Pubbly Console

The pubbly console is what TeamCCI developed inhouse and used to create the content for the 

## Startup instructions

If you are going to use AWS, Amazon linux is a great jumping off point.

### Remove www and replace with console from git
* cd /var/www
* sudo rm -r html
* sudo chown ubuntu:ubuntu .
* sudo git clone https://github.com/PubblyDevelopment/pubbly_console.git .

## Shell install after that

-- sudo ./install.sh
Not finished... please do the manual. below

## Manual install (if you want to get dirty)

### new lamp server

* sudo apt-get upgrade
* sudo apt-get update
* sudo apt install tasksel
* sudo tasksel install lamp-server

* sudo apt-get install php-zip
* sudo apt-get install php-xml

### PHP.ini setup

> vim /etc/php/7.2/apache/php.ini
> find upload_max_filesize
> change to 200M

### Import database

* sudo mysql -u root -p
* CREATE DATABASE pubbly_console;
* CREATE USER 'pubbly_console'@'localhost' IDENTIFIED BY 'PutPasswordHere';
* grant all privileges on pubbly_console.* to 'pubbly_console'@'localhost';
* flush privileges;
* USE mysql;
* SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
* exit;

> sudo mysql -u root -p pubbly_console < sql/freshBuild.sql

### Moving over config files

* cd /var/www/html/
* sudo vim config_default.php
(change password on line 4 to whatever you want)
(write to /html/config.php
* :w config.php

### Get python up and running

* sudo apt-get install python3
* sudo vim /etc/apache2/conf-available/cgi-enabled.conf
> <Directory "/var/www/html/py">
>    Options +ExecCGI
>    AddHandler cgi-script .cgi .py
> </Directory>
* sudo a2enconf cgi-enabled
* sudo service apache2 restart

### Server is ready

Strongly advice that you change the root password to something secure, that you disallow the following of system indexes, and other smart software people things.
