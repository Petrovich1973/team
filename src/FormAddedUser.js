import React from 'react'
import axios from 'axios'

const url = 'http://localhost:5000/users'

const defaultForm = {
    name: "",
    location: ""
}
export const FormAddedUser = ({createSuccess = () => {console.log('createSuccess')}}) => {

    const [form, setForm] = React.useState(defaultForm)
    const [pending, setPending] = React.useState(false)



    const onSend = async () => {
        setPending(true)
        const result = await axios.post(url, form)
        setPending(false)
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
        <div className={'form'}>
            <p>
                <input disabled={pending} type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                &nbsp;<span>name</span>
            </p>
            <p>
                <input disabled={pending} type="text" value={form.location}
                       onChange={e => setForm({...form, location: e.target.value})}/>
                &nbsp;<span>location</span>
            </p>
            <div>
                <button disabled={pending || Object.values(form).some(s => !s)} onClick={onSend}>Create</button>
                &nbsp;
                {pending && <div className="lds-dual-ring"/>}
            </div>
        </div>
    )
}