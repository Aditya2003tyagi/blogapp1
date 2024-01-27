const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((error)=>{
        console.log("DB facing connectiion issues");
        console.error(err);
        process.exit(1);
    })
};
module.exports = connectWithDb;