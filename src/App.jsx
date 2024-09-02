import { useState, useRef } from 'react'
import './App.css'
import Task from "./components/Task"

function App() {
  const [incompletedTodos, setIncompletedTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([]);
  const [tag, setTag] = useState("");
  const [filter, setFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("")
  const text = useRef("")


  const handleCheckToCompleted = (update) => {
    const newTodos = incompletedTodos.filter(todo => {
      if (todo.title === update) {
        setCompletedTodos([todo, ...completedTodos]);
        return false; // Remove from incompletedTodos
      }
      return true; // Keep in incompletedTodos
    });
  
    setIncompletedTodos(newTodos);
  };

  const handleCheckToIncompleted = (update) => {
    const newCompletedTodos = completedTodos.filter(todo => {
      if (todo.title === update) {
        setIncompletedTodos([todo, ...incompletedTodos]);
        return false; // Remove from completedTodos
      }
      return true; // Keep in completedTodos
    });

    setCompletedTodos(newCompletedTodos);
  }

  const handleSubmit = () => {
    if (text.current != "") {
      let isSame = false
      for (let i = 0; i < incompletedTodos.length; ++i) {
        if (incompletedTodos[i].title == text.current) {
          alert("You already have that task.")
          isSame = true
        }
      }
      if (!isSame) {
        setIncompletedTodos([{title: text.current, tag: tag}, ...incompletedTodos]);
        text.current = ""
        setTag("");
      }
    }
    document.getElementById("todoInput").value = "";
  }

  const startsWith = current => word => current ? word.slice(0, current.length).toLowerCase() === current.toLowerCase() : true
  const tagWith = current => word => current ? current === word : true

  return (
    <>
    <div>
      <input id="todoInput" type="text" placeholder="Enter To-do here" onChange={e => {text.current = e.target.value}}></input>
      <select onChange={e => {setTag(e.target.value)}}>
        <option disabled selected value=""> -- select an option -- </option>
        <option value="">None</option>
        <option value="School">School</option>
        <option value="Work">Work</option>
        <option value="Hobby">Hobby</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    <div>
      <input id="filterInput" type="text" placeholder="Filter your To-do's here" onChange={e => {setFilter(e.target.value)}}></input>
      <button onClick={() => {setFilter(""); document.getElementById("filterInput").value = "";}}>Clear</button>
    </div>
    <div>
      <select id="tagFilterInput" onChange={e => {setTagFilter(e.target.value)}}>
        <option disabled selected value=""> -- select an filter -- </option>
        <option value="School">School</option>
        <option value="Work">Work</option>
        <option value="Hobby">Hobby</option>
      </select>
      <button onClick={() => {setTagFilter(""); document.getElementById("tagFilterInput").value = "";}}>Clear</button>
    </div>
    <div className='logo'>
      <div className='list'>
        <h2>To Do</h2>
          {incompletedTodos.filter(todo => startsWith(filter)(todo.title) && tagWith(tagFilter)(todo.tag)).map((todo) => {
            return <Task name={todo.title} tag={todo.tag} handleCheck={handleCheckToCompleted} check={false}></Task>
          })}
      </div>
      <div className='list'>
        <h2>Completed</h2>
        {completedTodos.filter(todo => startsWith(filter)(todo.title) && tagWith(tagFilter)(todo.tag)).map((todo) => {
            return <Task name={todo.title} tag={todo.tag} handleCheck={handleCheckToIncompleted} check={true}></Task>
          })}
      </div>
    </div>
    </>
  )
}

export default App
