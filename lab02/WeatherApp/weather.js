const express = require('express');
const request = require('request');
const hbs = require("hbs");

const app = express();
const port = 3000;
app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Weather App</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }
                    .container {
                        border: 2px solid #808080;
                        border-radius: 1px;
                        padding: 20px;
                        display: inline-block;
                    }
                    h1 {
                        margin-bottom: 20px;
                    }
                    form {
                        margin-top: 20px;
                    }
                    button {
                        padding: 10px 20px;
                        font-size: 18px;
                        background-color: #007bff;
                        color: #fff;
                        border: none;
                        cursor: pointer;
                        border-radius: 5px;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Сервіс для отримання даних про погоду</h1>
                    <form action="/weather/Kyiv" method="get">
                        <button type="submit">Сторінка погоди</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

app.get('/weather/:city', (req, res) => {
    const city = req.params.city;
    const apiKey = '6986b83c1a3d714dba9d32e4c7c1c26d';

    request(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
        (error, response, body) => {
            if (error) {
                res.status(500).send('Error fetching weather data');
                return;
            }

            const data = JSON.parse(body);

            if (response.statusCode === 200) {
                res.render("weather.hbs", {
                    city: city,
                    pressure: data.list[0].main.pressure,
                    humidity: data.list[0].main.humidity,
                    temperature: (data.list[0].main.temp - 273.15).toFixed(0)
                });
            } else {
                res.status(response.statusCode).send(data.message);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
