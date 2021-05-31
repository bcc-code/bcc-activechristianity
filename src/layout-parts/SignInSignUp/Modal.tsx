import * as React from 'react'
import { useDispatch } from "react-redux";
import { closeSignInModal } from '@/state/action'
import Main from './Main'
/* import ForgotPassword from '@/layout-parts/Form/ForgotPassword' */
import ForgotPassword from './ForgotPassword'
import GiveConsent from './GiveConsent'
import { CloseIcon } from '@/components/Icons/MUI/arrowIcons'
import { motion } from 'framer-motion'
const GetContent: React.FC<{ option: string }> = ({ option }) => {
    switch (option) {
        case 'signUpOptions' || 'signInOptions' || 'signUpForm' || 'signInForm':
            return <Main option={option} />
        case 'forgotPassword':
            return <ForgotPassword />
        case 'giveConsent':
            return <GiveConsent />;
        default:
            return <Main option={option} />
    }
}
const SigninSignUpModal: React.FC<{ option: string }> = ({ option }) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        console.log('handle close')
        dispatch(closeSignInModal())
    }

    const modalEl = React.useRef<HTMLInputElement>(null);
    const closeOnClick = (e: any) => {
        if (modalEl && modalEl.current && !modalEl.current.contains(e.target)) {

            /*  handleClose() */

        }
    }

    React.useEffect(() => {
        setTimeout(() => {
            document.addEventListener('click', closeOnClick);
        }, 500)
        return () => {
            document.removeEventListener('click', closeOnClick);
        }
    }, [option])


    return (
        <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 h-screen w-screen p-2 flex justify-center items-center overflow-scroll" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 700 }}>

            <div
                ref={modalEl}
                className="relative flex flex-col bg-white text-grey-500 rounded-lg shadow-md w-5/6 sm:w-3/4 md:w-mobile max-h-full overflow-hidden"
            >
                <button
                    className="absolute top-0 right-0 z-10 p-2 text-white"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </button>

                <GetContent option={option} />
            </div>
        </motion.div>
    )
}

export default SigninSignUpModal
