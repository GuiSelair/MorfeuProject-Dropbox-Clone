var express = require('express');
var router = express.Router();
const formidable = require("formidable")
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/file", (req, res) => {
    const path = "./" + req.query.path;
    if (fs.existsSync(path)){
        fs.readFile(path, (error, data) => {
            if (error){
                res.status(400).json({"error": error})
            }else {
                res.status(200).end(data)
            }

        })
    }else{
        res.status(404).json({error: "File not found"})
    }
})

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

router.delete("/file", (req, res) => {
  //  IncomingForm: Chamada o formulario
  const form = new formidable.IncomingForm({
    uploadDir: "./upload",
    keepExtensions: true
  })

  form.parse(req, (error, fields, files) => {

    const path = `./${fields.path}`;

    if (fs.existsSync(path)){
      fs.unlink(path, error => {
        if (error){
          res.status(400).json({
            error
          })
        }else{
          res.json({fields})
        }
      })
    }
  })
})

module.exports = router;
