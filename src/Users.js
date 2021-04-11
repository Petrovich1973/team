import React from 'react'
import axios from 'axios'

const url = 'http://localhost:5000/users'

export const Users = ({flag = Date.now()}) => {
    const [users, setUsers] = React.useState([])
    const [update, setUpdate] = React.useState(Date.now())
    const [pending, setPending] = React.useState([])
    const [blockedItems, setBlockedItems] = React.useState([])

    React.useEffect(() => {
        (() => onFetchList())()
    }, [flag, update])

    const onFetchList = async () => {
        const time = Date.now()
        setPending(p => [...p, time])
        await axios(url)
            .then(result => {
                setUsers(result.data)
                setPending(p => p.filter(i => i !== time))
            })
            .catch(e => {
                setPending(p => p.filter(i => i !== time))
            })
    }

    const onDeleteItem = async (id) => {
        setBlockedItems(s => [...s, id])
        const result = await axios.delete(`${url}/${id}`)
        setBlockedItems(s => s.filter(f => f !== id))
        try {
            if (result.status === 200) {
                setUpdate(Date.now())
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={'list'}>
            {users.length ? <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>location</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {users.map((item, idx) => {
                    const {id, name, location} = item
                    const isBlocked = blockedItems.includes(id)
                    return (
                        <tr className={'list_item'} key={idx}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{location}</td>
                            <td>
                                {!isBlocked && <span
                                    title={'Remove item'}
                                    className={'list_item_btn-delete'}
                                    onMouseOver={(t) => {
                                        t.target.parentElement.parentElement.classList.add('list_item-hover')
                                    }}
                                    onMouseOut={(t) => {
                                        if(!isBlocked) t.target.parentElement.parentElement.classList.remove('list_item-hover')
                                    }}
                                    onClick={() => {
                                        if(!isBlocked) onDeleteItem(id)
                                    }}>&#10005;</span>}
                            </td>
                        </tr>
                    )
                })
                }
                </tbody>

            </table> : pending.length ? <p>
                waiting...
            </p> : <p>пока ничего нет</p>}
        </div>
    )
}