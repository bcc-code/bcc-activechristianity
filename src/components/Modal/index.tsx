import * as React from 'react'
import Modal from 'react-modal';
import { CloseIcon } from '@/components/Icons/MUI/arrowIcons'

/*         <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-screen w-screen p-2 flex justify-center items-center overflow-scroll" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 700 }}
            > */

const CustomModal: React.FC<{ handleClose: () => void, isOpen: boolean }> = ({ children, handleClose, isOpen }) => {
    return (

        <Modal
            isOpen={isOpen}
            className="inset-0 h-screen w-screen p-2 flex justify-center items-center overflow-scroll"
            style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 700 } }}
        >
            <div
                className="relative flex flex-col bg-white text-grey-500 rounded-lg shadow-md w-5/6 sm:w-3/4 md:w-mobile max-h-full overflow-hidden"
            >
                <button
                    className="absolute top-0 right-0 z-10 p-2 text-white"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </button>

                {children}
            </div>
        </Modal>

    )
}

export default CustomModal
