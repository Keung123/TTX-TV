require('dotenv').config();
var admin = require("firebase-admin");

console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
    credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    databaseURL: "https://ttxtv-309f5-default-rtdb.firebaseio.com"
});

console.log('Firebase Admin App Name: ' + admin.app().name);

module.exports = admin;