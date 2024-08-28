/* eslint-disable react/prop-types */
const TodoInput = function ({
  addTodo,
  setAddTodo,
  handleEnter,
  handleCreate,
}) {
  return (
    <div className="mx-auto mb-5 flex max-w-[500px] items-center">
      <input
        className="m-3 h-[38px] flex-1 rounded-md border border-primary px-2"
        type="text"
        placeholder="Todo list"
        value={addTodo}
        onChange={(e) => setAddTodo(e.target.value)}
        onKeyDown={(e) => handleEnter(e.key)}
      />
      <button
        onClick={handleCreate}
        className="mr-4 h-[38px] rounded-md bg-primary px-2 text-primary-base shadow-sm"
      >
        ADD
      </button>
    </div>
  );
};

export default TodoInput;
