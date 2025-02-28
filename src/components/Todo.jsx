import { useEffect, useRef } from "react";
import todo_icon from "../assets/todo_icon.png";
import TodoTasks from "./TodoTasks";
import { useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      is_Completed: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTask = (id) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, is_Completed: !todo.is_Completed };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-[#DCDCDC] border-2 border-[#B0B0B0] shadow-[4px_4px_6px_rgba(0,0,0,0.2)] place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl ">
      {/* --------TITLE-------- */}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="todo-icon" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* --------INPUT BOX-------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Your Task"
        />
        <button
          onClick={add}
          className="bg-gradient-to-r from-[#232526] via-[#414345] to-[#232526] bg-[length:200%_auto] text-white px-10 py-4 uppercase rounded-full shadow-lg transition-all duration-500 hover:bg-[position:right_center] cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* --------TASKS-------- */}

      <div>
        {todoList.map((item, index) => {
          return (
            <TodoTasks
              key={index}
              text={item.text}
              id={item.id}
              is_Completed={item.is_Completed}
              deleteTask={deleteTask}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
