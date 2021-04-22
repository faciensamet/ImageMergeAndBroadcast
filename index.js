const fs = require("fs");
const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
const { debug } = require("console");

var fileList = fs.readdirSync("images");

var imageList = [];

for(i=0;i<fileList.length;i++)
{
    imageList.push({ src:"images/"+fileList[i], x: i* 100, y: 0});
}

mergeImages(imageList, { Canvas: Canvas, Image: Image, format:"image/jpeg", quality:0.6 })
  .then(b64 => fs.writeFile("merge/merge.jpg", b64.replace(/^data:image\/jpeg;base64,/, ""), 'base64', function(err) { if(err) console.log(err); }));


if(!fs.existsSync("images"))
    fs.mkdirSync("images");

if(!fs.existsSync("merge"))
    fs.mkdirSync("merge");