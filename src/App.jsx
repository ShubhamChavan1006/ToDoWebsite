import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState(()=>{
    //Load from Local storage on initial renfer
    const savedTodos = localStorage.getItem("todos");
    return savedTodos? JSON.parse(savedTodos):[];
  });

  // {todoTitle, todoDesc, completed, todoId}

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  //save todos to Local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault(); // to prevent the page refresh

    const todoObj = {
      todoTitle: todoTitle,
      todoDesc: todoDesc,
      completed: false,
      todoId: Date.now(),
    };

    console.log(todos);

    setTodos([...todos, todoObj]);
    setTodoTitle("");
    setTodoDesc("");
  }

  function deleteTodo(id){
    const updatedTodos = todos.filter((todo) => todo.todoId !== id);
    setTodos(updatedTodos);
  }

  return (
    <div>
      <Header />

      <div className="form-wrapper">
        <form onSubmit={(e) => addTodo(e)}>
          <div>
            <label htmlFor="todo-title">Todo title : </label>
            <input
              required
              id="todo-title"
              type="text"
              value={todoTitle}
              placeholder="Enter todo title"
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="todo-description">Todo Description : </label>
            <input
              required
              type="text"
              id="todo-description"
              value={todoDesc}
              placeholder="Enter todo Description"
              onChange={(e) => setTodoDesc(e.target.value)}
            />
          </div>
          <button type="submit">Add Todo</button>
        </form>
      </div>

      <div className="all-todos">
        <h2 className="all-todosh2">All Todos</h2>
        <div className="todos-wrapper">
          {todos.map((todo) => {
            return (
              <div className="todo-card">
                <p className="todo-title">{todo.todoTitle}</p>
                <p className="todo-desc">{todo.todoDesc}</p>
                <button className="delete-btn"
                onClick={() => deleteTodo(todo.todoId)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;