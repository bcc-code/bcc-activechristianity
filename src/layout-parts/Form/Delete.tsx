import React from 'react'
import { useDispatch } from "react-redux"

import { OutlineButton } from '@/components/Button'
import { InputText } from '@/components/Input'
import TS from '@/strings'

const initialFieldsState = {
    existingPassword: '',

}
const initialErrorState = {
    existingPassword: false,
}

type IFormFieldType = 'existingPassword'
const ChangePassword = () => {
    const [fields, setFields] = React.useState(initialFieldsState)
    const [errors, setErrors] = React.useState(initialErrorState)
    const [loading, setLoading] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<undefined | string>(undefined)
    const dispatch = useDispatch()
    const validate = () => {
        const fieldNames: IFormFieldType[] = ['existingPassword'];
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
            const { existingPassword } = fields

            const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];

        }
    }

    return (
        <form
            className="flex-1 flex flex-col items-center justify-center max-w-mobile w-full h-full px-4 py-6"
        /*         loading={loading}
                error={!!errorMessage || !!error.length} */
        >
            <InputText
                label={TS.password}
                type='password'
                value={fields.existingPassword}
                onChange={(e) => {
                    handleChange(e, 'existingPassword')
                }}
            />

            <div className="py-2">
                <OutlineButton
                    onClick={handleSubmit}
                    name="Delete"
                />

            </div>
        </form>

    )
}

export default ChangePassword