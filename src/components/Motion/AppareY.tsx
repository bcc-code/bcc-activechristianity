import React from 'react'
import { m as motion } from 'framer-motion'

/* motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }} */

const MotionAppareY: React.FC<any> = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            {...props}
        >
            {props.children}
        </motion.div>
    )
}

export default MotionAppareY