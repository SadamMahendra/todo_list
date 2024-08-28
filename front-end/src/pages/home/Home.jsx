/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import axios from "axios";

import emptyImg from "../../assets/images/Detective-check-footprint 1.png";

import TodoInput from "./component/TodoInput";
import TodoItems from "./component/TodoItems";

function home() {
  const [addTodo, setAddTodo] = useState("");
  const [todo, setTodo] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todo");
        const todosWithEdit = response.data.data.map((item) => ({
          ...item,
          editStatus: false,
        }));
        setTodo(todosWithEdit);
        console.log(todosWithEdit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async function () {
    try {
      if (addTodo == "") {
        return alert("Please input text before add todo");
      }

      const response = await axios.post("http://localhost:3000/todo/create", {
        name: addTodo,
        status: 0,
      });

      if (response.status === 201) {
        const newTodo = { ...response.data.data, editStatus: false };
        setTodo((prevTodo) => [...prevTodo, newTodo]);
        setAddTodo("");
      }
    } catch (err) {
      console.error("Error creating todo", err);
    }
  };

  const handleEnter = function (key, id = null) {
    if (key === "Enter") {
      if (id) {
        return handleUpdate(id);
      } else {
        return handleCreate();
      }
    }
  };

  const handleCheckboxChange = async function (id) {
    const todoToUpdate = todo.find((todo) => todo.id === id);
    const newStatus = !todoToUpdate.status;

    try {
      const response = await axios.patch(
        `http://localhost:3000/todo/update/${id}`,
        { status: newStatus },
      );

      if (response.status === 200) {
        setTodo((prevTodo) => {
          return prevTodo.map((todo) =>
            todo.id === id ? { ...todo, status: newStatus } : todo,
          );
        });
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const handleEditMode = function (id, name) {
    setUpdateTodo(name);
    setTodo((prevTodo) => {
      return prevTodo.map((todo) =>
        todo.id === id ? { ...todo, editStatus: true } : todo,
      );
    });
  };

  const handleUpdate = async function (id) {
    const todoToUpdate = todo.find((todo) => todo.id === id);

    try {
      const response = await axios.patch(
        `http://localhost:3000/todo/update/${id}`,
        {
          name: updateTodo || todoToUpdate.name,
          status: todoToUpdate.status,
        },
      );

      if (response.status === 200) {
        setTodo((prevTodo) => {
          return prevTodo.map((todo) =>
            todo.id === id
              ? { ...todo, name: updateTodo, editStatus: false }
              : todo,
          );
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async function (id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todo/delete/${id}`,
      );
      if (response.status === 200) {
        setTodo((prevTodo) => {
          return prevTodo.filter((todo) => todo.id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-[100vh] font-sans">
      <h1 className="mb-5 mt-10 text-center text-2xl font-bold">TODO LIST</h1>
      <TodoInput
        addTodoValue={addTodo}
        setAddTodo={setAddTodo}
        handleEnter={handleEnter}
        handleCreate={handleCreate}
      />

      <div className="flex max-h-[500px] flex-col gap-2">
        {todo.length === 0 ? (
          <div className="mx-auto flex flex-col">
            <img className="w-60" src={emptyImg} />
            <p className="text-center font-bold">Empty...</p>
          </div>
        ) : (
          todo.map((data) => (
            <TodoItems
              key={data.id}
              data={data}
              handleCheckboxChange={handleCheckboxChange}
              handleEditMode={handleEditMode}
              handleDelete={handleDelete}
              updateTodo={updateTodo}
              setUpdateTodo={setUpdateTodo}
              handleEnter={handleEnter}
              handleUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default home;
