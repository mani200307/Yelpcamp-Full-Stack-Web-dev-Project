const mongoose = require("mongoose");
const cities = require("./cities");
const {descriptors, places} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true
})
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30) + 10;
        const camp = new Campground({
            author: "62f9ca234249250afd67b941",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dyfqudmt6/image/upload/v1660704331/Yelpcamp/slxqm6z3uxgk3hi3oeqe.jpg',
                    filename: 'Yelpcamp/slxqm6z3uxgk3hi3oeqe',
                },
                {
                    url: 'https://res.cloudinary.com/dyfqudmt6/image/upload/v1660704333/Yelpcamp/wonyuf33ttdspupkrjyg.jpg',
                    filename: 'Yelpcamp/wonyuf33ttdspupkrjyg',
                },
                {
                    url: 'https://res.cloudinary.com/dyfqudmt6/image/upload/v1660704336/Yelpcamp/deu7u7qjdlm0on7crxuz.jpg',
                    filename: 'Yelpcamp/deu7u7qjdlm0on7crxuz',
                }
            ],
            geometry: {
                type: "Point",
                coordinates : [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            }
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})