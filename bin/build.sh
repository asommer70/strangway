#!/bin/bash
#
# Build the Meteor app, move files, and install npm modules.
#


meteor build ../strangway.pro --directory --architecture os.linux.x86_64 --server-only 

#mv -f ../strangway.pro/bundle/* ../strangway.pro 
rsync -a ../strangway.pro/bundle ../strangway.pro/

cd ../strangway.pro/programs/server/

npm install

pm2 restart strangway
