# Pubbly Console
 
The pubbly console is what TeamCCI developed inhouse and used to create the content for their entry in the Global Learning Xprize.

## Startup instructions

If you are going to use AWS, Amazon linux is a great jumping off point.

### New lamp server

* sudo apt-get upgrade
* sudo apt-get update
* sudo apt install tasksel
* sudo tasksel install lamp-server

* sudo apt-get install php-zip
* sudo apt-get install php-xml

### Remove www and replace with console from git
* cd /var/www
* sudo rm -r html
* sudo chown ubuntu:ubuntu .
* git clone https://github.com/PubblyDevelopment/pubbly_console.git .

### PHP.ini setup

> vim /etc/php/7.2/apache/php.ini
> find upload_max_filesize
> change to 200M

### Import database and content

You may want to start completely fresh, if you're building a new project from the ground floor up. You may also want to start with all xprize related content preloaded, if you're basing your new project on our existing build.

EIther way, create a new database.

* sudo mysql -u root -p
* CREATE DATABASE pubbly_console;
* CREATE USER 'pubbly_console'@'localhost' IDENTIFIED BY 'PutPasswordHere';
* grant all privileges on pubbly_console.* to 'pubbly_console'@'localhost';
* flush privileges;
* USE mysql;
* SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
* exit;

For a fresh build (no content)

> sudo mysql -u root -p pubbly_console < sql/freshBuild.sql

Go on to the next step (no need to alter FS)

---

If an loaded build (all xprize content)

> sudo mysql -u root -p pubbly_console < sql/xprizeBuild.sql

Then download all the data from some server somewhere (put on box?), and copy to all the relevant directories (write up commands?)


### Moving over config files

* cd /var/www/html/
* sudo vim config_default.php
(change password on line 4 to whatever you want)
(write to /html/config.php
* save config.php

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

Strongly advice that you change the root password to something secure, that you disallow following indexes, and other smart software people things.

## 