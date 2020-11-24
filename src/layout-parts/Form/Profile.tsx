import * as React from "react"
import { useDispatch } from "react-redux"

import ac_strings from '@/strings/ac_strings.js'
import { useSelector } from 'react-redux'
import { IRootState } from '@/state/types'
import { OutlineButton } from '@/components/Button'

import { InputText } from '@/components/Input'



type IFormFieldType = 'email' | 'name'

const Profile: React.FC<{ title: string }> = ({ title }) => {
    const authInfo = useSelector((state: IRootState) => state.auth);
    const { user } = authInfo

    const initialFieldsState = {
        email: user && user.email ? user.email : '',
        name: user && user.name ? user.name : '',
    }
    const initialErrorState = {
        email: false,
        name: false,
    }

    React.useEffect(() => {
        const state = {
            email: user && user.email ? user.email : '',
            name: user && user.name ? user.name : '',
        }
        setFields(state)
    }, [user])

    const [fields, setFields] = React.useState(initialFieldsState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<undefined | string>(undefined)
    const dispatch = useDispatch()

    const validate = () => {
        const fieldNames: IFormFieldType[] = ['email', 'name'];
        const result = { ...errors }
        let pass = true;

        for (let field of fieldNames) {
            if (fields[field].trim() === '') {
                result[field] = true
                pass = false
            } else {
                result[field] = false
            }
            setErrors(result)
        }
        return pass;

    }

    const handleChange = (e: any, fieldName: string) => {
        validate()

        setFields({
            ...fields,
            [fieldName]: e.target.value
        });
    }

    const handleSubmit = () => {
        if (validate()) {
            setLoading(true)
            setErrorMessage('')
        }
    }

    return (
        <form
            className="flex-1 flex flex-col items-center justify-center max-w-mobile w-full h-full px-4 py-6"
        /*         loading={loading}
                error={!!errorMessage || !!error.length} */
        >
            <h1 className="w-full">{title}</h1>
            <div className="w-full">Id: {user?.id}</div>
            {/* {errors.email ? <div>{TS.required_username_or_email}</div> : null} */}
            <InputText
                label={ac_strings.full_name}
                type='text'
                value={fields.name}
                onChange={(e) => {
                    handleChange(e, 'name')
                }}
            />
            <InputText
                label={ac_strings.email}
                type='text'
                value={fields.email}
                onChange={(e) => {
                    handleChange(e, 'email')
                }}
            />
            <div className="py-2">
                <OutlineButton
                    onClick={handleSubmit}
                    name="Update"
                />

            </div>
        </form>
    )
}

export default Profile