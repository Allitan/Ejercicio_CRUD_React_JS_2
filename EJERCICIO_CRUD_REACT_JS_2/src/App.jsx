import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import Categoria from './components/Categoria'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categoria />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
