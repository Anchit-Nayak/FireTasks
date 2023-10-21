import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'
import {db} from "../Firebase/Firebase"
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore"
import toast, {Toaster} from 'react-hot-toast'

const List = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  //create todo
  const createTodo = async (e) =>{
     e.preventDefault(e);
     if(input===''){
       toast.error("Please enter a valid task")
       return;
     }
     await addDoc(collection(db, 'todos'),{
       text: input,
       completed: false,
     })
     toast.success("Task added")
     setInput('');
  }

  //read todo
  useEffect(()=>{
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      let todosArr = [];
      querySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(),id: doc.id})
      })
      setTodos(todosArr)
    })
    return ()=> unsubscribe
  }, [])


  //update todo
  const toggleComplete = async(todo) =>{
      await updateDoc(doc(db, 'todos', todo.id),{
        completed : !todo.completed
      })
  }

  //delete todo
  const toggleDelete = async (id) =>{
      await deleteDoc(doc(db, 'todos', id))
  }  


  return (
    <div className='h-auto max-w-md flex justify-center'>
      <div className='bg-gray-700 p-6 rounded-xl h-auto w-[900px] max-w-[900px] border border-gray-50'>
        <div className='mb-7 flex justify-center'>
        <h1 className='font-bold text-4xl'>Todo App</h1>
        </div>
        <form onSubmit={createTodo}>
            <div className='flex justify-between'>
            <input value={input} onChange={(e)=>setInput(e.target.value)} type='text' placeholder='Add item' className='hover:bg-gray-600 w-full mr-2 text-xl p-2 border bg-gray-500 rounded-lg'></input>
            <button className='border border-gray-50 p-4 rounded-md bg-gray-500 hover:bg-gray-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            </button>
            </div>
        </form>
        <div className='mt-5'>
        <ul>
            {todos.map((todo, index)=>(
                <ListItem key={index} task={todo} toggleComplete={toggleComplete} toggleDelete={toggleDelete}/>
            ))}
        </ul>
        {todos.length<1 ? null : <p className='text-center p-2'>{`You have ${todos.length} todos`}</p>}
        </div>
        <Toaster/>
      </div>
    </div>
  )
}

export default List