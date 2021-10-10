const express = require("express");
const todos = require("../../api/Todo.js");
const router = express.Router();

router.route("/").get(todos.getTodos).post(todos.createTodo);
router.route("/:id").delete(todos.deleteTodo).put(todos.updateTodo);

module.exports = router;
