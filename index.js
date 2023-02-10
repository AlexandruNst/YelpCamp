const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Campground = require("./models/campground")

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log("Mongo connection open"))
    .catch(err => console.log(err))


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({ title: "My backyard", description: "Cheap Camping" });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
})