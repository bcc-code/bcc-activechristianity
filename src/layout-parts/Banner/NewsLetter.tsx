import * as React from 'react'
import * as yup from 'yup';

import PostTitle from '@/components/PostElements/TextSizeWClamp'
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { Controller, useForm } from 'react-hook-form';
import ac_strings from '@/strings/ac_strings.js'
import { openInfo } from '@/state/action'
const acApiModule = import('@/util/api')
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const Banner = () => {
    const dispatch = useDispatch()
    const [focused, setFocused] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const { control, formState, handleSubmit, reset } = useForm({
        mode: 'onChange',
        defaultValues: { email: '' },
        resolver: yupResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit(model: any) {

        const { email } = model
        if (isValid) {


            return acApiModule.then(res => {
                const api = res.default
                return api.subscribeNewsletter(email).then(res => {
                    if (res.subscribe) {
                        dispatch(openInfo({ text: res.subscribe.message }))
                        reset({ email: '' })
                    }
                })
            })
        }
    }

    return (
        <div className="relative bg-white w-full bg-ac-slate-dark p-8 mx-auto pt-8 flex items-center" style={{ height: "360px" }}>
            <div className="standard-max-w w-full flex flex-col">
                <PostTitle
                    rawText={ac_strings.subscriber_newsletter || 'Subscribe to Our Newsletter   '}
                    bold="font-semibold"
                    fontKey="header-post"
                    clamp={3}
                    className="text-white w-full pb-6 mb-4 sm:mb-0"
                />
                <form className="w-full flex-col sm:flex-row flex" onSubmit={handleSubmit(onSubmit)}>
                    <div className={`w-full xs:w-8/12 mr-2 sm:mr-4 font-semibold text-blue-600 text-lg  rounded-lg overflow-hidden input-wrap  mb-4 sm:mb-0`}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    className={`w-full block py-2 sm:py-4 px-4 text-black`}
                                    type="text"
                                    required={true}
                                    onFocus={() => { setFocused(true) }}
                                    {...field}
                                    placeholder={ac_strings.email}
                                />

                            )}
                        />

                    </div>
                    <button
                        className={`w-full xs:w-4/12  sm:text-base px-4 py-2 sm:py-4 sm:px-12 rounded-lg font-semibold  ${loading || !isValid ? 'bg-gray-400' : 'bg-blue-600 border-blue-600'} text-white text-lg  hover:bg-blue-400`}
                        type="submit"
                        disabled={loading || !isValid}
                    >
                        {ac_strings.submit}
                    </button>


                </form >
            </div>
        </div>
    )
}

export default Banner