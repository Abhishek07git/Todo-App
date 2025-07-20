import Navbar from "./components/Navbar"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  // for local storage::
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }


  // Edit function::
  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    settodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLocalStorage();

  }
  // delete function::
  const handleDelete = (e, id) => {
    console.log(`The id is :${id}`);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLocalStorage();
  }

  // Add function::
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos);
    saveToLocalStorage();

  }
  // change function::
  const handleChange = (e) => {
    settodo(e.target.value)
  }

  // checkbox handling function
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index);

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLocalStorage();
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[85vh] md:w-[50%]">
      <h1 className="font-bold text-center text-3xl">Todo - manager : Manage Your Todos At One Place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>

          <div className="flex">
          <input onChange={handleChange} value={todo} className="bg-white w-full rounded-full px-5 py-1" type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-600 p-4 py-2 text-sm font-bold text-white rounded-full mx-2 ">
            Save</button>

          </div>
        </div>


        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished}  /> Show Finished <hr />
        <h2 className="text-2xl font-bold">Your todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display!</div>}
          {todos.map(item => {


            return (showFinished|| !item.isCompleted)&& <div key={item.id} className="todo flex my-3 justify-between">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>


      </div>
    </>
  )
}

export default App
