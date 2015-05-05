TowHee is a beautiful small bird :)

** Setup **

- sudo npm install
- npm install -g bower
- bower install
- brew install mongodb

** Start up server**
- sudo mongod
- node server.js (in separate tab)

** Set up geometric index **
- db.collection.createIndex({ location : "2dsphere" });

** Testing **
- Run npm test

** Troubleshooting **
- if error ```[initandlisten] exception in initAndListen: 29 Data directory /data/db not found```
  - sudo mkdir -p /data/db/
  - sudo chown `id -u` /data/db

**Testing**