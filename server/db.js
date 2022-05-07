const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mern-cms-auth")
    .then(() => { console.log("connect DB successfully"); })
    .catch(err => { console.log(`connect DB FAIL: ${err}`); })