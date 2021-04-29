var express = require('express');
var router = express.Router();
var firebase_db = require('../services/Firebase_RealtimeDB');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/create', (req, res, next) => {

	if (req.body.name) {

        // first add Room
        let ref1 = firebase_db.ref('Rooms');

        let newRoom = {
            name: req.body.name,
            desc: req.body.desc,
            key: req.body.key,
            by: req.body.userUID,
        }

        let keyback = ref1.push(newRoom).key;


        // then add userHosts
		let ref2 = firebase_db.ref('UserHosts/' + req.body.userUID);

        ref2.push(keyback);

		console.log('Room Added: ');
        console.log(newRoom);

		res.status(200).send();
	}
	else{
		res.status(400).send();
	}
})

router.post('/join', (req, res, next) => {

	if (req.body.rid) {

        // check id and key first
        let ref1 = firebase_db.ref('Rooms/' + req.body.rid)

        ref1.once('value')
            .then(snapshot => {
                
                // cant join self
                if(snapshot.val().key == req.body.key && snapshot.val().by != req.body.uid) {
                    // correct, add userRooms
                    let ref2 = firebase_db.ref('UserRooms/' + req.body.uid);

                    // cant join repeatedly
                    ref2.once('value')
                        .then(s1 => {

                            let s1val = s1.val()
                            let has = false;

                            for (let i in s1val) {
                                console.log(s1val[i]);
                                if (s1val[i] == req.body.rid) {
                                    has = true;
                                }
                            }
                            // no repeat
                            if (!has) {
                                // join
                                ref2.push(req.body.rid);

                                res.status(200).send();
                                console.log('Room Joined: ');    
                                console.log(req.body);
                            }
                            else {
                                let msg = 'Join Room: Cant join repeatedly.'
                                console.log(msg);
                                res.status(400).send(msg);
                            };
                        })
                        .catch(e => {
                            console.log(e);
                            res.status(400).send(e);
                        });

                    
                    
                    
                }
                // wrong id or key
                else {
                    let msg = 'Join Room: Wrong key or id, or Join self';
                    console.log(msg);
                    res.status(401).send(msg);
                }
            
            }).catch(e => {
                console.log(e);
                res.status(400).send(e);
            })
	}
	else{
		res.status(400).send();
	}
})

router.post('/delete', function (req, res, next) {

    if(req.body.roomID) {

        // first delete room
        let ref1 = firebase_db.ref('Rooms');

        ref1.child(req.body.roomID).remove()
            .then( fb => {
                
                let ref2 = firebase_db.ref('UserHosts/' + req.body.uid).orderByKey();
                // remove host
                ref2.once('value')
                    .then(snapshot => {
                        snapshot.forEach(childSnapshot =>{
                            if(childSnapshot.val() == req.body.roomID) {
                                let ref3 = firebase_db.ref('UserHosts/' + req.body.uid).child(childSnapshot.key);
                                ref3.remove()
                                    .then( fb => {
                                        res.status(200).send();

                                    }).catch(e => {
                                        console.log(e);
				                        res.status(400).send(e);
                                    });
                            }
                        })
                    }).catch(e => {
                        console.log(e);
                        res.status(400).send(e);
                    });
            }).catch(e => {
                console.log(e);
				res.status(400).send(e);
            });

        let ref4 = firebase_db.ref('UserRooms/');
        
        ref4.once('value')
            .then(s4 => {
                s4.forEach(s4child => {
                    s4child.forEach(s4cchild => {
                        let vals4 = s4cchild.val();
                        if (vals4 == req.body.roomID) {
                            firebase_db.ref(s4cchild.ref).remove();
                        }
                    })
                })
            })
    }
    else{
		res.status(400).send();
	}
    
});

router.get('/details', function (req, res, next) {

    if (req.query.rid) {

        let ref = firebase_db.ref('Rooms/' + req.query.rid);

        ref.once('value')
            .then(snapshot => {
                let val = snapshot.val();
                
                res.status(200).send(val);
            }).catch(e => {
                console.log(e);
				res.status(400).send(e);
            });
    }
    else {
        res.status(400).send();
    }
});


router.get('/medias', function (req, res, next) {

    if (req.query.rid) {

        let resultArr = [];

        let ref = firebase_db.ref('RoomVideos/' + req.query.rid);

        ref.once('value')
			.then( snapshot => {

				let val = snapshot.val();

				for (let i in val) {
					
					let m = val[i];
                    console.log(m);

                    resultArr.push(m);
				}

                res.status(200).send(JSON.stringify(resultArr));

			}).catch( e => {
				console.log(e);
				res.status(400).send(e);
			});
    }
    else {
        res.status(400).send();
    }
});

router.post('/play', (req, res, next) => {

	if (req.body.rid && req.body.vlink) {

        let ref1 = firebase_db.ref('RoomsPlaying/' + req.body.rid);

        ref1.set(req.body.vlink)
            .then( r => {
                res.status(200).send();
            }).catch(e => {
                console.log(e);
				res.status(400).send(e);
            });
	}
	else{
		res.status(400).send();
	}
})

router.get('/playing', (req, res, next) => {

	if (req.query.rid) {

        let ref1 = firebase_db.ref('RoomsPlaying/' + req.query.rid);

        ref1.once('value')
            .then( snapshot => {
                let val = snapshot.val();
                console.log(val);
                res.status(200).send(val);
            })
            .catch(e => {
                console.log(e);
				res.status(400).send(e);
            });
	}
	else{
		res.status(400).send();
	}
})


module.exports = router;
