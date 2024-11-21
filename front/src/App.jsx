import { useState } from 'react'

import './App.css'
import Login from './Login'
import Form from './routes/Form'
import PromotionalCard from './routes/Congratulation'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom"; 
function App() {
    return (
        <Router>
        <Routes>
        <Route exact path='/' element={<Form />}/>
        <Route exact path='/congratulation' element={<PromotionalCard />}/>
        </Routes>
        </Router>
    )
}

export default App
