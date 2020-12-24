var express = require('express');
var router = express.Router();
var universitiesRouter = require('./universities');
router.get('/', function (req, res) {
    res.json({ message: "GOT ON /API" });
});
router.use('/', universitiesRouter);
module.exports = router;
//# sourceMappingURL=api.js.map