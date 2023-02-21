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
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/random/300x300?camping,${i}`,
            description: "Lorem Ipsum Dolor Sit Amet",
            price: price,
            author: "63f4bbbc3c6315115c76004e"
        })

        await camp.save();
    }
}

seedDb()
    .then(() => mongoose.connection.close());
