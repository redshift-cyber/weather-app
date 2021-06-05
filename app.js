const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
  const query = req.body.city; // It was working fine but when I started to use the conditions with the api like the icons that's when I started to run in problems
  const apiKey = "1e0b3788b1b120c47b8d2c0fa51920af";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey;

  https.get(url, function (response) {
   

    response.on("data", function (data) {
      const weatherData = JSON.parse(data.toString());
      console.log(req.body.cityName)
      console.log(weatherData)
      const temp = weatherData.temp_min;
      const weatherDescription = weatherData.weather[0].description
     
      const icon = weatherData.weather[0].icon

      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather description is currently " + weatherDescription + "</p>")
      res.write("<h1>The temperature in" + query + "is " + temp + " degrees celcius.</h1>");
      res.write("<img src=" + imageURL + ">")
//this is the url
      res.send()
    })

  })
})

app.listen(2222, function () {
  console.log("server running on port 3000")
})