import React from 'react'
import axios from 'axios'

const url = 'http://localhost:5000/users'
export const Users = ({flag = Date.now()}) => {

    const [users, setUsers] = React.useState([])
    const [update, setUpdate] = React.useState(Date.now())

    React.useEffect(() => {

        const fetchUsers = async () => {
            const result = await axios(url)
            setUsers(result.data)
        }
        fetchUsers()

    }, [flag, update])

    const onDelete = async id => {
        const result = await axios.delete(`${url}/${id}`)
        console.log(result.status)
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
            {users.length ? users.map((item, idx) => {
                const {id, name, location} = item
                return (
                    <p key={idx}><span onClick={() => onDelete(id)}>&#10005;</span> {id} {name} {location}</p>
                )
            }) : <p>waiting...</p>}
        </div>
    )
}