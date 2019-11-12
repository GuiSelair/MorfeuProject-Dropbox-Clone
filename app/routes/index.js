var express = require('express');
var router = express.Router();
const formidable = require("formidable")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: "./upload",
    keepExtensions: true
  })
  res.json(req.body)
})

module.exports = router;
