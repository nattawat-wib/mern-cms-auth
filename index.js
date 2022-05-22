const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const sanitize = require("express-mongo-sanitize");
const path = require("path");

const memberRouter = require("./routes/memberRoute");
const articleRouter = require("./routes/articleRoute");
const port = process.env.PORT || 8080;

require("dotenv").config();
require("./db");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);
app.use(xss());
app.use(sanitize());

app.use("/api/member", memberRouter);
app.use("/api/article", articleRouter)

// if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/client/build/index.html"));
    })
// }

app.listen(port, () => {
    console.log(`server start at port ${port}`);
})