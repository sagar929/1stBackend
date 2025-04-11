const express  =  require("express");
const path = require("path");
const app =  express();
const fs = require('fs'); 

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")));



app.get('/', function(req, res) {
    fs.readdir('./files', function(err, files) {
      if (err) {
        console.error(err);
        files = [];
      }
      res.render("index", { files: files });
    });
  });
  
  app.post('/create', function(req, res) {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details,function(err,filedata){
         res.redirect("/");
    });
  });

  app.get("/files/:filename", function (req, res) {
    const filePath = `./files/${req.params.filename}`;
    fs.readFile(filePath, "utf-8", function (err, filedata) {
      if (err) {
        return res.status(404).send("File not found");
      }
      res.render("show", {
        filename: req.params.filename,
        filedata: filedata,
      });
    });
  });
  


app.listen(3000);