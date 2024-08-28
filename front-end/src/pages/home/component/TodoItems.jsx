/* eslint-disable react/prop-types */

import edit from "../../../assets/icons/edit.svg";
import trash from "../../../assets/icons/trash.svg";

const TodoItems = function ({
  data,
  handleCheckboxChange,
  handleEditMode,
  handleDelete,
  updateTodo,
  setUpdateTodo,
  handleEnter,
  handleUpdate,
}) {
  return data.editStatus === false ? (
    <div
      key={data.id}
      className="mx-auto mb-2 flex w-[300px] max-w-[500px] items-center pb-2 shadow-sm"
    >
      <input
        className="checkbox-status mr-2 h-6 w-6 border-primary text-xl font-bold"
        type="checkbox"
        checked={data.status}
        onChange={() => handleCheckboxChange(data.id)}
      />
      <p className={`flex-1 ${data.status ? "line-through" : ""}`}>
        {data.name}
      </p>
      <button onClick={() => handleEditMode(data.id, data.name)}>
        <img className="mr-2" src={edit} />
      </button>
      <button onClick={() => handleDelete(data.id)}>
        <img src={trash} />
      </button>
    </div>
  ) : (
    <div
      key={data.id}
      className="mx-auto mb-2 flex w-[300px] max-w-[500px] items-center"
    >
      <input
        className="h-[38px] flex-1 rounded-md border border-primary px-2"
        type="text"
        placeholder="Todo list"
        value={updateTodo}
        onChange={(e) => setUpdateTodo(e.target.value)}
        onKeyDown={(e) => handleEnter(e.key, data.id)}
      />
      <button
        onClick={() => handleUpdate(data.id)}
        className="ml-2 h-[38px] rounded-md bg-primary px-2 text-primary-base"
      >
        Update
      </button>
    </div>
  );
};

export default TodoItems;
