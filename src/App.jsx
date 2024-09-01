import { useState, useEffect, useRef } from 'react'
import './App.css'
import Task from "./components/Task"

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [incompletedTodos, setIncompletedTodos] = useState([]);
  const [tag, setTag] = useState("");
  const [filter, setFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("")
  const text = useRef("")

  useEffect(() => {
    setCompletedTodos(todos.filter(todo => todo.completed == true))
    setIncompletedTodos(todos.filter(todo => todo.completed == false))
  }, [todos])

  const handleCheck = (update) => {
    const newTodos = todos.map((todo) => {
      if (todo.title === update) {
        return {...todo, completed: !todo.completed}
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleSubmit = () => {
    if (text.current != "") {
      let isSame = false
      for (let i = 0; i < todos.length; ++i) {
        if (todos[i].title == text.current) {
          alert("You already have that task.")
          isSame = true
        }
      }
      if (!isSame) {
        setTodos([{title: text.current, tag: tag, completed: false}, ...todos]);
        text.current = ""
        setTag("");
      }
    }
    document.getElementById("todoInput").value = "";
  }

  const startsWith = current => word => current ? word.slice(0, current.length).toLowerCase() === current.toLowerCase() : true
  const tagWith = current => word => current ? current === word : true
  console.log("render")

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
            return <Task name={todo.title} tag={todo.tag} handleCheck={handleCheck} check={false}></Task>
          })}
      </div>
      <div className='list'>
        <h2>Completed</h2>
        {completedTodos.filter(todo => startsWith(filter)(todo.title) && tagWith(tagFilter)(todo.tag)).map((todo) => {
            return <Task name={todo.title} tag={todo.tag} handleCheck={handleCheck} check={true}></Task>
          })}
      </div>
    </div>
    </>
  )
}

export default App
