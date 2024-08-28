const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });
const cors = require("cors");

const express = require("express");

const app = express();
app.use(cors());

const todoRouter = require("./routes/todo.route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todo", todoRouter);

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log("Server Running");
});
