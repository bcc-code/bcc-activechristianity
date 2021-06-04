
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeInfo } from '@/state/action/'
import { infobarSelector } from '@/state/selectors/other'
import Snackbar from '@/components/Snackbar'
import { AnimatePresence, motion } from 'framer-motion'

export default (props: { showDuration?: number }) => {

    const dispatch = useDispatch()
    const infobarContent = useSelector(infobarSelector)
    React.useEffect(() => {

        if (props.showDuration) {
            setTimeout(() => {
                dispatch(closeInfo())
            }, props.showDuration)
        }
    }, [infobarContent])

    const handleClose = () => {
        dispatch(closeInfo())
    }
    return (
        <AnimatePresence>
            {infobarContent && infobarContent.text ? (
                <motion.div

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-6 mx-auto w-full flex justify-center p-4 " style={{ zIndex: 650 }}>
                    <Snackbar
                        className="pl-6"
                        text={infobarContent?.text}
                        onClick={handleClose}
                    />

                </motion.div>
            ) : null}
        </AnimatePresence>
    )


}
