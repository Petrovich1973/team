import React, {useReducer} from 'react'
import {ContextApp, initialState, reducer} from "./reducer"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Users} from './Users'
import {NotFound} from './NotFound'
import {Header} from "./Header"
import './App.css'

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ContextApp.Provider value={{dispatch, state}}>
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path={`/users`} component={Users}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        </ContextApp.Provider>
    )
}

export default App
