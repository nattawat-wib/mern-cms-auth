const express = require("express");
const app = express();
const cors = require("cors");

const memberRouter = require("./routes/memberRoute");

require("./db");

const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/member", memberRouter);

app.listen(port, () => {
    console.log(`server start at port ${port}`);
})