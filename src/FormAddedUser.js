import React from 'react'
import axios from 'axios'

const url = 'http://localhost:5000/users'

const defaultForm = {
    name: "",
    location: ""
}
export const FormAddedUser = ({createSuccess = () => {console.log('createSuccess')}}) => {

    const [form, setForm] = React.useState(defaultForm)

    const onSend = async () => {
        const result = await axios.post(url, form)
        try {
            if (result.status === 201) {
                setForm(defaultForm)
                createSuccess(Date.now())
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <p>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                &nbsp;<span>name</span>
            </p>
            <p>
                <input type="text" value={form.location}
                       onChange={e => setForm({...form, location: e.target.value})}/>
                &nbsp;<span>location</span>
            </p>
            <p>
                <button onClick={onSend}>Create</button>
            </p>
        </div>
    )
}