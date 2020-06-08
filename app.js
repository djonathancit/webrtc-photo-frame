const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 3001;

const app = express();




//app.listen(port, () => console.log(`App is listening on port ${port}.`));

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname + "/home.html"));
});

if(process.env.ENVIROMENT){
    app.listen(port, () => console.log(`App is listening on port ${port}.`));

}else{
    
    const key = fs.readFileSync("./key.pem");

    const cert = fs.readFileSync("./cert.pem");
    
    const server = https.createServer({ key: key, cert: cert }, app);

    server.listen(port, () => {
        console.log(`server listening on ${port}`);
    });
}
