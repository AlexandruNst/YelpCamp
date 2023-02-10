const mongoose = require("mongoose");
const Campground = require("../models/campground")
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers")

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log("Mongo connection open"))
    .catch(err => console.log(err))

const numCampgrounds = 50;

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDb = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < numCampgrounds; i++) {
        const random1000 = Math.floor(Math.random() * 1000);

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })

        await camp.save();
    }
}

seedDb()
    .then(() => mongoose.connection.close());
