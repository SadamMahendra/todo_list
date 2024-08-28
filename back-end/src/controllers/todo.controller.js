const { todo: todoModel } = require("../models");

const index = async (req, res, next) => {
  const todo = await todoModel.findAll({
    // order: [["id", "DESC"]],
  });

  return res.send({
    message: "success",
    data: todo,
  });
};

const create = async (req, res, next) => {
  const { name, status } = req.body;

  await todoModel
    .create({
      name,
      status,
    })
    .then((dataResponse) => {
      return res.status(201).send({
        message: "successfully made a todo",
        data: dataResponse,
      });
    });
};

const update = async (req, res, next) => {
  const { id_todo } = req.params;

  const { name, status } = req.body;

  const existingTodo = await todoModel.findByPk(id_todo);
  if (!existingTodo) {
    return res.status(404).json({
      message: "todo not found",
    });
  }

  const updateTodo = await existingTodo.update({
    name,
    status,
  });

  return res.send({
    message: "Data has been updated",
    data: updateTodo,
  });
};

const deleteTodo = async (req, res, next) => {
  const { id_todo } = req.params;

  const existingTodo = await todoModel.findByPk(id_todo);
  if (!existingTodo) {
    return res.status(404).json({
      message: "todo not found",
    });
  }

  await existingTodo.destroy();

  return res.send({
    message: "Data has been delete",
    data: null,
  });
};

module.exports = {
  index,
  create,
  update,
  deleteTodo,
};
