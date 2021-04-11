import React from 'react'
import {Users} from './Users'
import {FormAddedUser} from './FormAddedUser'
import './App.css'

function App() {
    const [flag, setFlag] = React.useState(Date.now())

    const createSuccess = (date) => {
        setFlag(date)
    }
    return (
        <div className="App">
            <header className="App-header">
                Users {flag}
            </header>
            <FormAddedUser createSuccess={createSuccess}/>
            <Users flag={flag}/>
        </div>
    )
}

export default App
