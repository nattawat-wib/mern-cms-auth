const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const sanitize = require("express-mongo-sanitize");

const memberRouter = require("./routes/memberRoute");

require("dotenv").config();
require("./db");

const port = process.env.PORT || 8081;

app.use(cors());
// app.use(xss());
// app.use(sanitize());

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use("/member", memberRouter);

app.listen(port, () => {
    console.log(`server start at port ${port}`);
})