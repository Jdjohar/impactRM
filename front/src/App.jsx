import { useState } from 'react'

import './App.css'
import Login from './Login'
import Form from './routes/Form'
import PromotionalCard from './routes/Congratulation'
import Product from './routes/Product'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom"; 
import Size from './routes/Size'
import Colors from './routes/Colors'
import Choice from './routes/Choices'
import Thanks from './routes/Thanks'
function App() {
    return (
        <Router>
        <Routes>
        <Route exact path='/' element={<Form />}/>
        <Route exact path='/congratulation' element={<PromotionalCard />}/>
        <Route exact path='/product' element={<Product />}/>
        <Route exact path='/size' element={<Size />}/>
        <Route exact path='/colors' element={<Colors />}/>
        <Route exact path='/choise' element={<Choice />}/>
        <Route exact path='/thanks' element={<Thanks />}/>
        </Routes>
        </Router>
    )
}

export default App
