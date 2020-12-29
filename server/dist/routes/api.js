var express = require('express');
var router = express.Router();
var universitiesRouter = require('./universities');
var user_router = require('./user');
router.get('/', function (req, res) {
    res.json({ message: "GOT ON /API" });
});
router.use('/', universitiesRouter);
router.use('/', user_router);
module.exports = router;
//# sourceMappingURL=api.js.map