import React from 'react';
import "./styles.css";
import { reducer } from './reducers/todo.reducer';
import { actions } from './reducers/todo.reducer';

const initialState = {
  todoList: []
};


const TodoListContext = React.createContext();
const Provider = ({ children }) => {
const [state, dispatch] = React.useReducer(reducer, initialState);
const value = {

    todoList: state.todoList,
    addTodoItem: (todoItemLabel) => {
      dispatch({ type: actions.ADD_TODO_ITEM, todoItemLabel });
    },
    removeTodoItem: (todoItemId) => {
      dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId });
    },
    markAsCompleted: (todoItemId) => {
      dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId });
    }
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

const AddTodo = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { addTodoItem } = React.useContext(TodoListContext);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        placeholder={"Type and add todo item"}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          addTodoItem(inputValue);
          setInputValue("");
        }}
      >
        Add
      </button>
    </>
  );
};

const TodoList = () => {
  const { todoList, removeTodoItem, markAsCompleted } = React.useContext( TodoListContext);
  return (
    <ul>
      {todoList.map((todoItem) => (
        <li className={`todoItem ${todoItem.completed ? "completed" : ""}`} key={todoItem.id}
         onClick={() => markAsCompleted(todoItem.id)}>
          {todoItem.label}
          <button className="delete" onClick={() => removeTodoItem(todoItem.id)} >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default function App() {
  return (
    <Provider>
      <AddTodo />
      <TodoList />
    </Provider>
  );
}

 


