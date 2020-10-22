import * as React from 'react'
import { useDispatch } from 'react-redux'
import { setIsModalOpen } from '@/state/action'
import CloseButtonRound from '@/components/Button/CloseButtonRound'
import loadable from '@loadable/component'
const ReactModal = loadable(() => import('react-modal'))


interface IChildProps {
    closeModal: () => void
}
interface IModal {
    content: (props: IChildProps) => JSX.Element
    trigger: JSX.Element
    contentLabel: string
}

const Modal: React.FC<IModal> = ({ content: Component, contentLabel, trigger }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen)
        /* dispatch(setIsModalOpen(!isOpen)) */
    }

    const closeModal = () => {
        setIsOpen(false)
        /*  dispatch(setIsModalOpen(false)) */
    }
    const customStyles = {
        overlay: {
            background: `rgba(255,255,255,0.9)`,
            zIndex: 5000
        }
    };

    return (
        <div>
            <div onClick={toggleModal}>
                {trigger}
            </div>
            <ReactModal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                className="flex flex-col bg-white text-grey-500 rounded-lg shadow-md relative w-5/6 sm:w-3/4 md:w-mobile max-h-full overflow-scroll"
                overlayClassName="absolute top-0 left-0 h-screen w-screen p-2 flex justify-center items-center"
                contentLabel={contentLabel}
                style={customStyles}
            >
                <button
                    className="absolute top-0 right-0 z-10"
                    style={{ padding: '5px' }}
                    onClick={toggleModal}
                    onKeyDown={toggleModal}
                >
                    <CloseButtonRound />
                </button>
                <Component closeModal={closeModal} />

            </ReactModal>
        </div>
    )
}

export default Modal
