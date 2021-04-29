var express = require('express');
var router = express.Router();
var firebase_db = require('../services/Firebase_RealtimeDB');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/createIfNotExist', (req, res, next) => {

	if (req.body.uid) {

		let ref = firebase_db.ref('Users/' + req.body.uid);
		
		let data = {
			name: req.body.displayName,
			uid: req.body.uid,
			email: req.body.email,
			verified: req.body.verified,
		}
		
		ref.set(data);

		console.log('User Updated: ');
		console.log(data);

		res.status(200).send();
	}
	else{
		res.status(400).send();
	}
})

router.get('/hosts', function (req, res, next) {
	if (req.query.uid) {

		let resultArr = [];

		let hostRef = firebase_db.ref('UserHosts/' + req.query.uid);
		
		hostRef.once('value')
			.then( snapshot => {

				let val = snapshot.val();
				let numVal = snapshot.numChildren();
				let count = 1;

				for (let i in val) {
					
					let roomID = val[i];

					let roomRef = firebase_db.ref('Rooms/' + roomID);

					roomRef.once('value')
						.then( snapshot => {
						
							let roomdata = snapshot.val();
		
							let addedID = {
								by: req.query.name,
								desc: roomdata.desc,
								key: roomdata.key,
								name: roomdata.name,
								rID: roomID,
							}
							
							resultArr.push(addedID);
							
							// return res
							if (count == numVal) {
								res.status(200).send(JSON.stringify(resultArr));
							}
							count += 1;
						});	
				}
			}).catch( e => {
				console.log(e);
				res.status(400).send(e);
			});
	}
	else{
		res.status(400).send();
	}
});

router.get('/rooms', function (req, res, next) {
	if (req.query.uid) {

		let resultArr = [];

		let roomsRef = firebase_db.ref('UserRooms/' + req.query.uid);
		
		roomsRef.once('value')
			.then( snapshot => {

				let val = snapshot.val();
				let numVal = snapshot.numChildren();
				let count = 1;

				for (let i in val) {
					
					let roomID = val[i];

					let roomRef = firebase_db.ref('Rooms/' + roomID);

					roomRef.once('value')
						.then( snapshot => {
						
							let roomdata = snapshot.val();
		
							let addedID = {
								desc: roomdata.desc,
								name: roomdata.name,
								rID: roomID,
							}
							
							resultArr.push(addedID);
							
							// return res
							if (count == numVal) {
								res.status(200).send(JSON.stringify(resultArr));
							}
							count += 1;
						});	
				}
			}).catch( e => {
				console.log(e);
				res.status(400).send(e);
			});
	}
	else{
		res.status(400).send();
	}
});

module.exports = router;
