const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tushar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abba"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is some helpful texxt",
    name: "Tushar"
  });
});



app.get("/weather", (req, res) => {

    if (!req.query.address) {
        res.send({
            error: "Please Enter a valid address"    
        });
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({
                    error
                })
            }


            forecast({latitude, longitude, location},(error, data) => {
                        if (error) {
                            res.send({
                                error
                            })
                        }
                        res.send({
                            forecast: data,
                            location: location,
                            address: req.query.address
                        });
            });



        });
    }

});



app.get("*", (req, res) => {
  res.render("404", {
    title: "Sab yede aate idhar...",
    name: "Tushar"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
