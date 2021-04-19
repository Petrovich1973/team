import React, {useContext, useEffect, useState} from "react"
import {ContextApp} from "./reducer.js"
import axios from 'axios'
import {FormAddedUser} from "./FormAddedUser"

const url = 'http://localhost:5000/users'

export const Users = () => {
    const {state, dispatch} = useContext(ContextApp || null)
    const {users = [], usersBlocked = [], flagUpdateUsers = null} = state
    const [pending, setPending] = useState(false)

    useEffect(() => {
        (() => onFetchList())()
        return () => {
            clearUsersBlocked()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagUpdateUsers])

    const clearUsersBlocked = () => {
        dispatch({
            type: 'STATE_UPDATE',
            payload: {
                usersBlocked: []
            }
        })
    }

    const onFetchList = async () => {
        setPending(true)
        await axios(url)
            .then(result => {
                dispatch({
                    type: 'STATE_UPDATE',
                    payload: {
                        users: result.data
                    }
                })
                setPending(false)
            })
            .catch(err => {
                console.log(err)
                setPending(false)
            })
    }

    const onDeleteItem = async (id) => {
        dispatch({
            type: 'STATE_UPDATE',
            payload: {
                usersBlocked: [...usersBlocked, id]
            }
        })
        const result = await axios.delete(`${url}/${id}`)
        dispatch({
            type: 'STATE_UPDATE',
            payload: {
                usersBlocked: usersBlocked.filter(f => f !== id)
            }
        })
        try {
            if (result.status === 200) {
                dispatch({
                    type: 'STATE_UPDATE',
                    payload: {
                        users: users.filter(f => f.id !== id)
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={'container'}>
            <FormAddedUser/>
            <div className={'list'}>
                <div style={{color: 'green', opacity: pending && users.length ? 1 : 0}}>
                    <div className="lds-dual-ring colorGreen sm"/>
                    &nbsp;&nbsp;
                    <span>now being updated...</span>
                </div>
                {users.length ? <table>
                    <thead>
                    <tr>
                        <th className={'align-right'}>id</th>
                        <th>name</th>
                        <th>location</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item, idx) => {
                        const {id, name, location} = item
                        const isBlocked = usersBlocked.includes(id)
                        return (
                            <tr
                                className={`list_item ${isBlocked && 'list_item-hover'}`}
                                key={idx}>
                                <td className={'align-right'}>{id}</td>
                                <td>{name}</td>
                                <td>{location}</td>
                                <td>
                                    {!isBlocked && <span
                                        title={'Remove item'}
                                        className={'list_item_btn-delete'}
                                        onClick={() => onDeleteItem(id)}>&#10005;</span>}
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>

                </table> : pending ? <p>
                    waiting...
                </p> : <p>пока ничего нет</p>}
            </div>
        </div>
    )
}