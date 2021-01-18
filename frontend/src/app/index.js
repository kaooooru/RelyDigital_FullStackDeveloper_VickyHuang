import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { InfoInsert } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
    return (
        <Router>
            <Route path="/" exact component={InfoInsert} />
        </Router>
    )
}

export default App
