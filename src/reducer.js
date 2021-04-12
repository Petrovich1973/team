import React from "react"
export const ContextApp = React.createContext(null)

export const initialState = {
    app: {
        users: [],
        usersBlocked: [],
        flagUpdateUsers: Date.now()
    }
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'STATE_UPDATE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}