var firebase_admin = require('./Firebase_Admin');

var db = firebase_admin.database();

let ref = db.ref("/");
ref.once("value", function (snapshot) {
    console.log('Firebase Realtime DB: ready');
    // console.log(snapshot.val());
});

module.exports = db;