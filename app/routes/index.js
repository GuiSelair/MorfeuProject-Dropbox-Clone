var express = require('express');
var router = express.Router();
const formidable = require("formidable")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", (req, res) => {
  //  IncomingForm: Chamada o formulario
  const form = new formidable.IncomingForm({
    uploadDir: "./upload",
    keepExtensions: true
  })

  form.parse(req, (error, fields, files) => {
    res.json({files})
  })
})

module.exports = router;
