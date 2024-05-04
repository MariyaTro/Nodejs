const express = require("express");
const hbs = require("hbs");
let app = express();
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.send("Hello, Express!");
});
app.get("/weather", (req, res) => {
    const weather = {
        description: "Clear sky"
    }
    res.render("weather.hbs", {weather});
});
app.get("/weather/:city", (req, res) => {
    const city = req.params.city;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    res.send(cityName);
});
app.get("/login", (req, res) => {
    res.send("This is a login page");
});
app.listen(3000, ()=>{
    console.log("Example app listening on port 3000");
});