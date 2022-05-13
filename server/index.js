const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const sanitize = require("express-mongo-sanitize");

const memberRouter = require("./routes/memberRoute");
const articleRouter = require("./routes/articleRoute");
const port = process.env.PORT || 8081;

require("dotenv").config();
require("./db");


app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(xss());
app.use(sanitize());

app.use("/member", memberRouter);
app.use("/article", articleRouter)

app.listen(port, () => {
    console.log(`server start at port ${port}`);
})