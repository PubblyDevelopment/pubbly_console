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

## Creating packets

The pubbly console is just an intermediary, the end product of all console CMS work are collections of pubbly web packets. Packets can be downloaded individually or in aggregate. Pubbly packets, or a collection of packets, can be deployed to any number of environments as they are simply HTML/XML files, associated assets, and javascript to tie them all together.

There are two different types of packets, a "Standalones" and a "Dependent". Standalones are larger in size, but have an engine pre-attached, and are essentially "plug and play". Dependents are smaller in size, but will only work when manually built into a larger program structure.

Each content page (Static/Variable/Stitched/Mapped) will has "Packet Standalone" and "Packet Dependent" buttons. Select the Export you wish to package, click the button, wait a bit, and a zip will download to your local.

### Creating packets: Static Exports

To create a web packet from a static export

* Select your export in the console, and click the "download" button

### Creating packets: Variable Exports

We never needed to do specifically this, so the instructions are a little raw, but it still can be done.

* Log into your pubbly console brand server via a FTP/SFTP program (eg FileZilla)
* Create a temporary folder on your desktop (~/tmp)
* Navigate to the variable export you want to download (eg /var/www/html/series/{NAME_OF_VARIABLE_EXPORT})
* Download folder "audio", "images", "videos" along with every XML file to your desktop folder ~/tmp
* Clone the [Pubbly Engine](https://github.com/PubblyDevelopment/pubbly_engine) repository to your local
> The Pubbly Engine is the required JS and CSS to take the XML and assets of a console based Export, and create an interactive web page (for deployment via Cordova APK wrapper, hosted server, or offline hand-to-hand zips).
* From the Pubbly Engine repository on your local, copy and paste 
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

### Creating packets: Stitched Exports

Originally, the "stitch app" section of the console was to be the final assembly point for the cordova APK. However time constraints required that we assemble the cordova school structure manually, with a lesson by lesson approach. 

### Creating packets: Mapped Exports

* Navigate to the "Mapped Exports" section of the console.
* Select the map you wish to package.
* Click "Create Packet".

This process may take time for larger maps, but it will automatically download a zipped packet. NOTE: This packet (unlike Static, Variable and Stitched packets) has a Pubbly Engine automatically attached. 

## Deploying Packets

### Deploying Packets: Standalone

To run a Standalone packet, unzip the contents of your packet to a directory, and double click the "index.html". This will launch the pubbly in a browser. A Standalone can be unzipped to the web root of a Cordova project and built as APKs, or uploaded to a server and hosted as a webpage.

### Deploying Packets: Dependent

Dependent packets are more complicated. Once you navigate to their relative URL, they will run just fine. And while running, users can use the android triangle button to act as a "back". However they do not have an inherent external structure.

_Maps_ have an internal structure, you can jump from node to node just fine. And if a map _is_ your program, simply extract a Standalone packet to a boiler plate cordova web root. For instructions on that, see SOMETHING.



<pre>
.  
├── index.html <-- Custom program front end
├── Program_FrontEnd_Scripts
|   ├── assets
|   ├── css
|   └── js
|
├── pubbly_engine  
|   ├── assets
|   ├── css
|   └── js
|
├── packages  
|   └── staticExports
|       └── tutorialMain
|           ├── images  
|           ├── audio  
|           ├── Main.json  
|           └── index.html
|   └── variableExports
|       └── ABCs-A
|           ├── images  
|           ├── audio  
|           ├── Main.json  
|           └── index.html  
|       └── ABCs-B
|           └── ...  
|       └── ABCs-C
|           └── ...  
|   └── stitchedExports
|       └── Xprize-Reading-Intermediate-Lesson1
|           ├── images  
|           ├── audio  
|           ├── Main.json  
|           └── index.html
|       └── Xprize-Reading-Intermediate-Lesson2
|           └── ...  
|   └── mappedExports
|       └── EpicQuest-home
|           ├── images  
|           ├── audio  
|           ├── Main.json  
|           └── index.html
|       └── EpicQuest-gate1
|           └── ...  
|       └── EpicQuest-gate2
└──         └── ...  
</pre>


### Example packets
