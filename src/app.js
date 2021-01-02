const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fetch = require("node-fetch");
var requests = require('requests');
const app = express();
const apiKey = "362d7ef020a4df0f59b3ec2fbec6a06b";
// const staticPath = path.join(__dirname,"../public/");
// console.log(staticPath);
// app.use(express.static(staticPath));
// app.get("/",(req,res)=>{
//     res.send("home page");
// });
// app.get("/about",(req,res)=>{
//     res.send("about us page");
// });
// app.get("/contact",(req,res)=>{
//     res.send("contact us page");
// });


//setting the view engine
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partialsPath);
app.set("view engine","hbs");
app.set("views",viewsPath);




app.get("/",(req,res)=>{
    res.render("index",{
        name: "shiva"
    });
});
app.get("/about",(req,res)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${apiKey}&units=metric`;
    // requests(url).on("data",(chunk)=>{
    //     const data = [JSON.parse(chunk)];
    //     console.log(data[0].name);
    //     requests.destory();
    //     res.send(`city = ${data[0].name} and temprature is ${data[0].main.temp}C`);
    // }).on("end",(err)=>{
    //     if(err){
    //         requests.destory();
    //     res.send("invalid city");
    //     }
    // });
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        res.send(data);
    });
});

app.get("*",(req,res)=>{
    res.render("404");
});

app.listen(8000,()=>{
    console.log("listening to the port 8000");
});