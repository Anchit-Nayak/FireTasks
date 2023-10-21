import { useState } from 'react'
import './App.css'
import List from './Components/List'

function App() {

  return (
    <div className='h-screen w-2xl p-4 bg-gray-900 text-gray-50 flex items-center justify-center'>
      <List/>
    </div>
  )
}

export default App
