const fs = require("fs");
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');

var express = require('express')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
var upload = multer({ storage:storage })

var app = express();
app.use(express.static('merge'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/merge/merge.jpg");
})
   
app.listen(3000)












var fileList = fs.readdirSync("images");

var imageList = [];

for(i=0;i<fileList.length;i++)
{
    imageList.push({ src:"images/"+fileList[i], x: i* 100, y: 0});
}

mergeImages(imageList, { Canvas: Canvas, Image: Image, format:"image/jpeg", quality:0.3, width:1366, height:768 })
  .then(b64 => fs.writeFile("merge/merge.jpg", b64.replace(/^data:image\/jpeg;base64,/, ""), 'base64', function(err) { console.log("ok!"); if(err) console.log(err); }));


if(!fs.existsSync("images"))
    fs.mkdirSync("images");

if(!fs.existsSync("merge"))
    fs.mkdirSync("merge");