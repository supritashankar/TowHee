TowHee is a beautiful small bird :) See a presentation of the app and some of its features here: [http://www.cssherry.com/TowHee](http://www.cssherry.com/TowHee)

**Setup**

- sudo npm install
- npm install -g bower
- bower install
- brew install mongodb

Also include angular-slider.min.css from here https://github.com/prajwalkman/angular-slider


**Start up server**
- sudo mongod
- node server.js (in separate tab)

**Set up geometric index**
- db.collection.createIndex({ location : "2dsphere" });

**Testing**
- Run npm test

**Troubleshooting**
- if error ```[initandlisten] exception in initAndListen: 29 Data directory /data/db not found```
  - sudo mkdir -p /data/db/
  - sudo chown `id -u` /data/db

**Pending Issues**
- Events cannot be edited
- No screening of signup emails
- Articles are mixed in with events functionality
- Facebook integration
- Filter by date (only show events in the future)
- upload images
- Select multiple days
- Shorten Long descriptions
- Repeating events
- Store name and long/lat of event
- Identify each event uniquely ie Event + DateTime
