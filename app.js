const express = require('express');
let app = express();
let upload = require('express-fileupload');
const http = require('http');
http.Server(app).listen(3000); // make server listen on port 3000
console.log("Server Started at port 3000");

app.use(upload()); // configure middleware
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile('/index.html');
});

app.post('/upload',(req,res) => {
    // console.log(req.files);
    if(req.files.upFile){
        let file = req.files.upFile,
        name = file.name,
        type = file.mimetype;
        let uploadPath = __dirname + '/uploads/' + name;
        file.mv(uploadPath, (err) => {
            if(err){
                console.error("File Upload Failed", name, err);
                res.send("Error Occured!");
            } else {
                console.log("File Uploaded", name);
                res.send('Done! Uploading files');
            }
        });
    } else {
        res.send("No File selected !");
        res.end();
      }
});
