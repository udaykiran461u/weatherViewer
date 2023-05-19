const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    
    const country=req.body.countryName;
     const url="https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid=86259f7f25bc41cad38147268ffca317&units=metric";
    
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p style='color:red;font-family:bolder;text-align:center;margin-top:50px'>The Weather is : "+description+"</p>");
            res.write("<h1 style='color:black;font-family:bolder;text-align:center;'>The Temperature in "+country+" is "+temp+"</h1>");
            res.write("<center><img src="+imgurl+">")
            res.send();
        })
    })
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
});