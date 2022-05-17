const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    banner: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    createdAtTimestamp: {
        type: String,
        default: Date.now()
    },
    createdAtDateTime: {
        type: String,
        default: new Date().toLocaleString("th").slice(0, -3)
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "member",
        required: true
    }
})

module.exports = mongoose.model("article", articleSchema);