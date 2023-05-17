import React, { useState, useRef, useEffect } from 'react';
import Todo from "./components/Todo";
import Form from "./components/Form";
// A tiny, secure, URL-friendly, unique string ID generator for JavaScrip
import { nanoid } from "nanoid";
import FilterButton from './components/FilterButton';

//gets previous state when a user deletes a task from their list
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

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
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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

  const listHeadingRef = useRef(null);
  //invokes usePrevious() function to track the length of the tasks state
  const prevTaskLength = usePrevious(tasks.length);

useEffect(() => {
  if (tasks.length - prevTaskLength === -1) {
    listHeadingRef.current.focus();
  }
}, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>Challenge Tracker</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {
          filterList
        }
      </div>
      {/* Only apply a tabindex to an element when you're absolutely sure that making it focusable will benefit your user in some way. Irresponsible usage of tabindex could have a profoundly negative impact on keyboard and screen-reader users! */}
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

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