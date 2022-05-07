const mongoose = require("mongoose");

exports.module = mongoose.connect("mongodb://localhost:27017/mern-cms-auth")
    .then(() => { console.log("connect DB successfully"); })
    .catch(err => { console.log(`connect DB FAIL: ${err}`); })