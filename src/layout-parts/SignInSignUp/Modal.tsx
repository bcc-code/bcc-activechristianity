import * as React from 'react'
import { useDispatch } from "react-redux";
import { closeSignInModal } from '@/state/action'
import Main from './Main'
import Modal from '@/components/Modal';
/* import ForgotPassword from '@/layout-parts/Form/ForgotPassword' */
import ForgotPassword from './ForgotPassword'
import GiveConsent from './GiveConsent'


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
const SigninSignUpModal: React.FC<{ option: string, isOpen: boolean }> = ({ option, isOpen }) => {
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
        /*         <motion.div
        
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 h-screen w-screen p-2 flex justify-center items-center overflow-scroll" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 700 }}
                    > */
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <GetContent option={option} />
        </Modal>

    )
}

export default SigninSignUpModal
