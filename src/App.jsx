import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import UserList from "./components/UserList"

function App() {
  const baseUrl = "http://localhost:3000/posts"
  return (
    <>
      <UserList baseUrl={baseUrl} />
    </>
  )
}

export default App
