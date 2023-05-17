import React, { useState } from 'react';
import Todo from "./components/Todo";
import Form from "./components/Form";
// A tiny, secure, URL-friendly, unique string ID generator for JavaScrip
import { nanoid } from "nanoid";
import FilterButton from './components/FilterButton';

//The FILTER_MAP values are functions used to filter the tasks data array
const FILTER_MAP = {
  //The All filter shows all tasks, so we return true for all tasks
  All: () => true,
  //The Active filter shows tasks whose completed prop is false.
  Active: (task) => !task.completed,
  //The Completed filter shows tasks whose completed prop is true.
  Completed: (task) => task.completed,
};

// The Object.keys() method will collect an array of FILTER_NAMES
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  // const subject = props.subject;
  const taskList = tasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
    key={name} 
    name={name} 
    isPressed={name === filter} 
    setFilter={setFilter} 
    />
  ));

  const tasksNoun = taskList.lenght !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      //if this task has the same ID as the edited task
      if (id === task.id) {

        return { ...task, name: newName };
      }
        return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <div className="todoapp stack-large">
      <h1>Challenge Tracker</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {
          filterList
        }
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;