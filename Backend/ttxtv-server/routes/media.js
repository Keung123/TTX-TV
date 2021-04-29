var express = require('express');
var router = express.Router();
var firebase_db = require('../services/Firebase_RealtimeDB');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/upload', (req, res, next) => {

	if (req.body.rid && req.body.vlink) {

        // add Video
        let ref1 = firebase_db.ref('RoomVideos/' + req.body.rid);

        let vdata = {
            link: req.body.vlink,
            name: req.body.vname
        }

        ref1.push(vdata).then(r => {
            console.log('Video Added: ');
            console.log(vdata);
    
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



module.exports = router;
