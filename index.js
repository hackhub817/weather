const express = require("express");
const https = require("https");
const app = express();
const parser= require("body-parser");
 
app.use(parser.urlencoded({extended:true}))

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req,res){
    
    const city=req.body.cityName;
const api="a294fab774a38a8be8ed46084649bf1b#";
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit;

https.get(url,function(response){
console.log(response.status);

response.on("data",function(data){
   const w = JSON.parse(data);
const temp = w.main.temp;
const des = w.weather[0].description;
res.write("<p>the website<p>");
res.write("<h1>The temperature in "+city + " is "+ temp +"K</h1>");
 res.send();
})
});
})

// const city="London";
// const api="a294fab774a38a8be8ed46084649bf1b#";
// const unit="metric";
// const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+unit;

// https.get(url,function(response){
// console.log(response.status);

// response.on("data",function(data){
//    const w = JSON.parse(data);
// const temp = w.main.temp;
// const des = w.weather[0].description;
// res.write("<p>the website<p>");
// res.write("<h1>The temperature in london is "+ temp +"K</h1>");
//  res.send();
// })
// });
app.listen(2000,function(){
console.log("App started on port 2000");
});