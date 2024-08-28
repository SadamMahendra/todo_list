const express = require("express");

const router = express.Router();

const {
  index,
  create,
  update,
  deleteTodo,
} = require("../controllers/todo.controller");

router.get("/", index);
router.post("/create", create);
router.patch("/update/:id_todo", update);
router.delete("/delete/:id_todo", deleteTodo);

module.exports = router;
