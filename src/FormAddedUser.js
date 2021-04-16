import React, {useContext, useState} from "react"
import {ContextApp} from "./reducer.js"
import axios from 'axios'

const url = 'http://localhost:5000/users'

const defaultForm = {
    name: "",
    location: ""
}
export const FormAddedUser = () => {
    const {dispatch} = useContext(ContextApp || null)
    const [form, setForm] = useState(defaultForm)
    const [pending, setPending] = useState(false)
    const isDisabled = pending || Object.values(form).some(s => !s)


    const onSend = async () => {
        setPending(true)
        const result = await axios.post(url, form)
        setPending(false)
        try {
            if (result.status === 201) {
                setForm(defaultForm)
                dispatch({
                    type: 'STATE_UPDATE',
                    payload: {
                        flagUpdateUsers: Date.now()
                    }
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={'form'}>
            <h3>New User</h3>
            <p>
                <input
                    disabled={pending}
                    type="text"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}/>
                &nbsp;<span>name</span>
            </p>
            <p>
                <input
                    disabled={pending}
                    type="text"
                    value={form.location}
                    onChange={e => setForm({...form, location: e.target.value})}/>
                &nbsp;<span>location</span>
            </p>
            <div>
                <button
                    title={isDisabled ? 'Поля формы не должны быть пустыми' : 'Добавить пользователя'}
                    disabled={isDisabled}
                    onClick={onSend}>Create user
                </button>
                &nbsp;
                {pending && <div className="lds-dual-ring"/>}
            </div>
        </div>
    )
}