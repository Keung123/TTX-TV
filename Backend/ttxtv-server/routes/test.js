var express = require('express');
var router = express.Router();

/* Test response. */
router.get('/test', function(req, res, next) {
    
    let response = {
        "message": "Succeed"
    };

    res.status(200).json(response);
});

module.exports = router;
