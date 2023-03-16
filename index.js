require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const PORT = 4000 | process.env.PORT;
const Auth = require("./Routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello there");
});
app.use("/api", Auth);
mongoose.connect(process.env.MONGO_STRING).then(() => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
