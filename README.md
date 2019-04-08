# Pubbly Console

The pubbly console is what TeamCCI developed inhouse and used to create the content for the 

## Getting started

If you don't want to buy your own server and install our LAMP CMS yourself, you can register at sandbox.pubbly.com. We are currently hosting the sandbox URL. You may upload your own content, but all user posted files will be wiped on a weekly basis. If you want to host your own personal console repository, manual install is not so bad. I will be giving instructions for a clean up to date AWS ubuntu server, with ports open for SSH, SFTP, and HTTP. You _can_ use other server operating systems, but I will be giving instructions for only the above described.

Download console repo to your server's web root

* SSH into server
* cd /var/www
* sudo rm -r html
* sudo chown ubuntu:ubuntu .
* sudo git clone https://github.com/PubblyDevelopment/pubbly_console.git .

Install Apache 2.0, MySQL, and PHP 7+

* sudo apt-get upgrade
* sudo apt-get update
* sudo apt install tasksel
* sudo tasksel install lamp-server

Install PHP plugins 

* sudo apt-get install php-zip
* sudo apt-get install php-xml

Edit your php.ini to increase max upload file size.

> vim /etc/php/7.2/apache/php.ini
> find upload_max_filesize
> change to 200M

Import our database structure, using your own password (PutPasswordHere)

* sudo mysql -u root -p
* CREATE DATABASE pubbly_console;
* CREATE USER 'pubbly_console'@'localhost' IDENTIFIED BY 'PutPasswordHere';
* grant all privileges on pubbly_console.* to 'pubbly_console'@'localhost';
* flush privileges;
* USE mysql;
* SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
* exit;
* sudo mysql -u root -p pubbly_console < /var/www/sql/freshBuild.sql

Copy and modify the server's config file

* cd /var/www/html/
* sudo vim config_default.php
* change password on line 4 to whatever you used for PutPasswordHere
* save config.php

Get python up and running (Optional, probably for future development)

* sudo apt-get install python3
* sudo vim /etc/apache2/conf-available/cgi-enabled.conf
> <Directory "/var/www/html/py">
>    Options +ExecCGI
>    AddHandler cgi-script .cgi .py
> </Directory>
* sudo a2enconf cgi-enabled
* sudo service apache2 restart

Your server is now ready. I strongly advice that you change the root password to something secure, that you disallow the following of system indexes, and other smart software people things.

## Uploading and Creating contents

To upload content to the pubbly console, first create and export a zip from the design tools. Full instructions can be found at [Pubbly Design Tools](https://github.com/PubblyDevelopment/pubbly_design_tools) section "Exporting to a console"

Once you have a zip, 

### Uploading a static export

A static export is a book that does not need any templating or changes. It is exactly what you see in the pubbly design tools preview mode.

To upload a new static export, 

* Nativate to "Static Exports"
* Select "New static export"
* Enter a name (unique)
- Optional: Select a folder, or type in a name for a new folder
* Click "upload zip", and select the zip you just exported from the design tools

Static export uploaded. It can be found, viewed, downloaded, reuploaded and renamed from the Static Export main page.

### Uploading a variable export

A variable export is a book that needs certain assets to be "swapped out". Variable exports are very useful when creating large amounts of content with few developers/authors.

First, create a book in the pubbly design tools with some of the assets set to "variable". Full instructions can be found on the [Pubbly Design Tools]() repository, section "Parent Child system"

# Downloading content

## Downloading for design tools edits

### Downloading a Static Export

### Downloading a Variable Export

### Downloading a Stitched unit

Unfortunately, stitched units are compilations of pages created from other content. As such, there is no original "Main" file, and units cannot be opened in the design tools.

You can however edit the source content, and update each unit individually.

* Go to Stitch App in console
* Select the School, Subject, and Level of your unit. Then select your unit.
* Select "Edit" (Bottom right)
* This will open a new page, where you can create, edit, or check source of any units.
* At the bottom right of this screen you should see a list of pages that make up the unit.
* Hover the mouse over whichever page you wish to update.
* The tool tip should tell you which series the page comes from

Download/edit/reupload whichever variable export or static export coresponds to the page you wish to change

* Once the source page has changed, navigate back to the unit in question
* You should see a red "OUTDATED" next to the unit name.
* Select the unit, and click "Update + View", or "Update ALL" to update all outdated units in said level

---

We are developing an experimental feature which allows the design tools to create a new Main file from imported XML. You are welcome to experiment, but there are still bugs in this system.

To import an XML file into the Design tools, first download a unit.

* Go to Stitch App
* Select school, subject, and level of your unit
* Select Unit
* Select Downlod Unit button (bottom right)
* Extract zip to a new folder on your desktop, and feel free to delete all Main.VERSION.json files
* Run the Pubbly Design Tools
* From file, choose "import"
* Select the XML file you wish to import

The design tools should create a new design tools main file, and you should be able to make any edits and export the new project as you would any other.


### Downloading a Map

Maps are made up of multiple different exports, static, variable, or stitched. As such, they cannot be opened by the design tools, nor can the _entire_ map be imported in any meaningful way. If you wish to edit a map, edit the source for each node, and update the map.

* Find the node you wish to change, 


# Creating packets (exportint content)

The pubbly console is just an intermediary, the end product of all console CMS work are collections of pubbly web packets. Packets can be downloaded individually or in aggregate. Pubbly packets, or a collection of packets, can be deployed to any number of environments as they are simply HTML/XML files, associated assets, and javascript to tie them all together.

### Creating packet out of a single static export

To create a web packet from a static export

* Select your export in the console, and click the "download" button

The downloaded zip file should contain a file named "MainXML.xml". It may also contain a folder of "images", a folder of "audio" files, or a "Main.{version-number}.json" file.

* Attach the pubbly engine

For full instructions on how to attach the pubbly engine to your packet, checkout the [Pubbly Engine](https://github.com/PubblyDevelopment/pubbly_engine) repository readme, section "Attaching"

### Creating packet out of single variable export

We never needed to do specifically this, so the instructions are a little raw, but it still can be done.

* Log into your pubbly console brand server via a FTP/SFTP program (eg FileZilla)
* Create a temporary folder on your desktop (~/tmp)
* Navigate to the variable export you want to download (eg /var/www/html/series/{NAME_OF_VARIABLE_EXPORT})
* Download folder "audio", "images", "videos" along with every XML file to your desktop folder ~/tmp
* From the pubbly_engine repository, copy and paste 
    - pubbly_engine/assets to ~/tmp/pubbly_engine/assets
    - pubbly_engine/css to ~/tmp/pubbly_engine/css
    - pubbly_engine/js to ~/tmp/pubbly_engine/js
    - pubbly_engine/fonts to ~/tmp/pubbly_engine/fonts
* From the pubbly_engine repository, copy and paste 
    - "pubbly_engine/html/offline-xml.html" to ~/tmp/index.html
* Edit tmp/index.html
    - Replace "{PATH_TO_ENGINE}" with "pubbly_engine"
    - Replace "{PATH_TO_BOOK}" with "" (blank because current working directory)
    - Replace "{XML_STRING}" with the contents of whichever child XML file you wish to run
* Launch index.html, packet now runs in a browser

If you wish to do this with multiple children, simply repeat the above steps, except rename your "index.html" file to "Child_name_here.html".

You may also rework the PATH_TO_ENGINE and PATH_TO_BOOK variables to whatever alternate file system structure you wish. If the variables reflect a browser executable URL, the book will load and run fine.

### Creating packet out of unit in Stitch App school structure

Originally, the "stitch app" section of the console was to be the final assembly point for the cordova APK. However time constraints required that we assemble the cordova school structure manually, with a lesson by lesson approach. 

### Creating packet out of a Map





### Exporting full English/Swahili Xprize submission (content only)

todo

### Exporting map as APK

To export a map as an APK, 



#### Static exports

Static exports are books that require no changes from their preview mode. What you see in design tools is what you want in the browser.

Variable exports are books that need to be templated and mass produced. As an example, you need to create 26 books, each for a letter in the alphabet. Each book has a different picture of the letter, and a different associated audio file "speaks" the letter. But everything else (background images, link placement, points, everything) is the same between all 26 books.

Stitched exports are frankenstein books, created from multiple different pages on the console CMS. Page 1 comes from a Variable export. Page 2 comes from a Static export. Page 3-5 comes from 3 different static exports. Page 6 comes from the 9th page of a Variable export. Basically, Stitched exports are conglomerates from other sources. The main advantage is, you can update the "source" page once, and batch update all stitched exports that rely on the source page automatically.

Map exports are multiple different exports (Static, Variable, or Stitched) that link to eachother. A map is a designers way to create a fully interconnected collection of multiple working exports, and build directly as an APK.
