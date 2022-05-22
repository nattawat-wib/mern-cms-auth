const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_ATLAS)
    .then(() => { console.log("connect DB successfully"); })
    .catch(err => { console.log(`connect DB FAIL: ${err}`); })