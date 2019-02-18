#!/bin/sh

cd /var/www/
git checkout master
git checkout HEAD
git pull
git submodule update --init --recursive
