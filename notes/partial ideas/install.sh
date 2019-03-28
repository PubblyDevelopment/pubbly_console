cd /
apt-get upgrade -y
apt-get update -y
apt install tasksel -y
tasksel install lamp-server
cd /var/www/
rm -r html

echo "Please enter a password for this install. This password will be used for MySQL database, but it will be visible inside /html/config.php. Use something secure, that you don't mind other project devs seeing"
password=a
password2=b
while [[ "${password}" != "${password2}" ] ; do
    read -s -p "Password: " password
    read -s -p "Password again: " password2
done

echo "CREATE DATABASE console;" >> tmp.sql; 

# TODO: finish
