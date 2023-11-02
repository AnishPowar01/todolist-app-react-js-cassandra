import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

import {
  createTodo,
  fetchTodos,
  deleteTodoEach,
  updateTodo,
} from "../service/api";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch TODOs when the component mounts
    async function loadTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        // Handle the error
        console.error("Error loading TODO items:", error);
      }
    }

    loadTodos();
  }, []);

  const addTodo = async (description) => {
    try {
      const newTodo = await createTodo(description);
      setTodos([...todos, newTodo]);
    } catch (error) {
      // Handle the error
      console.error("Error adding TODO item:", error);
    }
  };

  // const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const deleteTodo = async (id) => {
    try {
      await deleteTodoEach(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting TODO item:", error);
      throw error;
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      // Call the updateTodo API function to update the task of the TODO item
      await updateTodo(id, task);

      // Update the component's state with the modified task
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
      );
    } catch (error) {
      // Handle any errors from the updateTodo function
      console.error("Error updating TODO item:", error);
    }
  };

  // const editTask = (task, id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
  //     )
  //   );
  // };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm key={index} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={index}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
