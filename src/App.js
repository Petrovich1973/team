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
                    Users
                </header>
                <FormAddedUser/>
                <Users/>
            </div>
        </ContextApp.Provider>
    )
}

export default App
