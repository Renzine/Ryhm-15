const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const fs = require("fs");
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');


const app = express();

let currentPos = 0;
let isItem = 0;

let allOrders = [];

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); //security issue
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = app.listen(80, () =>{
    console.log("Started on port 80")
})

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/home.html"));
})

app.get("/1", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/1.html"));
})

app.get("/2", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/2.html"));
})

app.get("/kitchen", (req,res) => {
    res.sendFile(path.join(__dirname,"/public/kitchen.html"));
})

app.post("/moveUp", (req, res) => {

    let steps = req.body.steps;
    let speed = 500;
    const dirname = __dirname.split("server")[0];
    exec('python ' + path.join(dirname,'/Raspi/command.py') + ' 1 1 ' + steps + ' ' + speed , (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(err);
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    res.send("OK");
    res.end();
})

app.post("/moveDown", (req, res) => {
    console.log("ADASDSAASDSDSA");
    let steps = req.body.steps;
    let speed = 500;
    const dirname = __dirname.split("server")[0];
    exec('python ' + path.join(dirname,'/Raspi/command.py') + ' 1 2 ' + steps + ' ' + speed , (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.log(err);
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    res.send("OK");
    res.end();
})


app.post("/moveToPos", (req, res) => {
    let wantedPos = parseInt(req.body.steps);
    let steps = Math.abs(wantedPos - currentPos) * 425;
    let speed = 1000;
    const dirname = __dirname.split("server")[0];
    console.log("SENDING TO POS");
    if(wantedPos > currentPos && wantedPos + currentPos <= 2){
        exec('python ' + path.join(dirname,'/Raspi/command.py') + ' 1 1 ' + steps + ' ' + speed , (err, stdout, stderr) => {

        });
        var id = setInterval(function (){
            if(isItem > 2000){
                exec('python ' + path.join(dirname,'/Raspi/command.py') + ' 1 2 ' + steps + ' ' + speed , (err, stdout, stderr) => {

                });
                clearInterval(id);
            }
        }, 1500);
    }else if(wantedPos < currentPos && wantedPos <= 2){
        exec('python ' + path.join(dirname,'/Raspi/command.py') + ' 1 2 ' + steps + ' ' + speed , (err, stdout, stderr) => {

        });
        var id = setInterval(function (){
            if(isItem > 2000){
                exec('python ' + path.join(dirname,'/Raspi/command.py') + ' 1 1 ' + steps + ' ' + speed , (err, stdout, stderr) => {

                });
                clearInterval(id);
            }
        }, 1500);
    }
    for (let i = 0; i < allOrders.length; i++) {

        if (allOrders[i] == wantedPos) {
            allOrders.splice(i, 1);
            break;
        }
    }
    console.log(allOrders);
    res.send("OK");
    res.end();
})

app.post("/status", (req, res) => {
    isItem = req.body.isItem;
    res.send("OK");
    res.end();
})

app.post("/order1", (req, res) => {
    console.log(1);
    allOrders.push(1);
    res.send("OK");
    res.end();
})

app.post("/order2", (req, res) => {
    allOrders.push(2);
    console.log(2);
    res.send("OK");
    res.end();
})

app.post("/kitchen", (req, res) => {
    res.json({orders: allOrders});
    res.end();
})

