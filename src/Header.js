import React from "react"
import {NavLink} from "react-router-dom"

export const Header = () => {
    return (
        <header className="App-header">
            <div className={'title'}>Management</div>
            <NavLink to={'/users'}>Users</NavLink>
        </header>
    )
}

