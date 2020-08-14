import * as React from 'react'
import { useSwipeable, Swipeable } from 'react-swipeable'
import "./pullDown.css"

const config = {
    delta: 10,                             // min distance(px) before a swipe starts
    preventDefaultTouchmoveEvent: false,   // preventDefault on touchmove, *See Details*
    trackTouch: true,                      // track touch input
    trackMouse: false,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
}


interface IProps {
    className?: string
    setReveal: (status: boolean) => void
    height: number
}

const PullDown: React.FC<IProps> = ({ children, setReveal, height, className }) => {
    const [swiping, setSwiping] = React.useState(0)
    const [Y, setY] = React.useState(0)

    const swipeUp = (e: any) => {
        console.log('swipe up')
        /*         if (!Y && window.scrollY > 10) {
                    resetSwipe()
                } */
    }
    const swipeDown = (e: any) => {
        /* if (!Y && window.scrollY > 10) resetSwipe() */
        /* if (!Y && window.scrollY > 10) resetSwipe() */
    }
    const onSwiping = (e: any) => {
        const deltaY = e.deltaY
        if (deltaY > 10) {
            resetSwipe()
        } else {
            setSwiping(70)
        }
        /* setY(initial + deltaY) */


    }

    const resetSwipe = () => {
        console.log('reset swipe')
        setSwiping(swiping - 1)
        if (swiping > 0) {
            /*  window.requestAnimationFrame(() => resetSwipe()); */
        } else {
            setSwiping(0)
            setReveal(false)
            setY(0)
        }
    }


    /*     const handlers = useSwipeable({ onSwiped: (eventData) => eventHandler, ...config }) */

    return (
        <div className={`${className ? className : ''} pull-down relative`} style={{ transform: `translateY(${swiping}px)` }}>
            <Swipeable
                onSwipedUp={swipeUp}
                onSwipedDown={swipeDown}
                onSwiping={onSwiping}
                {...config}


            >
                {children}

            </Swipeable>

        </div>
    )
}

export default PullDown;