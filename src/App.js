import React, {useReducer} from 'react'
import {ContextApp, initialState, reducer} from "./reducer.js"
import {Users} from './Users'
import {FormAddedUser} from './FormAddedUser'
import './App.css'

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <div className="App">
                <header className="App-header">
                    <div className="container">Users</div>
                </header>
                <div className="container">
                    <FormAddedUser/>
                    <Users/>
                </div>
            </div>
        </ContextApp.Provider>
    )
}

export default App
