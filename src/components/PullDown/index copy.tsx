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
        if (!Y && window.scrollY > 10) resetSwipe()
    }
    const swipeStart = (e: any) => {
        console.log('swipe start')
        if (window.scrollY < 10) {
            setSwiping(swiping || 0)
            setY(e.touches[0].screenY)
        }
    }
    const swipeMove = (e: any) => {
        console.log('swipe move')
        if (Y) {
            setY(e.touches[0].screenY - Y)
            setSwiping(swiping + Y)
            setY(e.touches[0].screenY)
            if (swiping < 0) setSwiping(0)
            else if (swiping > height) {
                setSwiping(height)
            }
            setReveal(swiping > height / 2)
            /* this.$emit('onReveal', this. > this.height/2) */
        }
    }
    const swipeEnd = (e: any) => {
        console.log('swipe end')
        if (swiping < height / 2) {
            resetSwipe()
        } else completeSwipe()
    }
    const completeSwipe = () => {
        setSwiping(swiping + 1)
        if (swiping < height) {
            window.requestAnimationFrame(() => completeSwipe());
        } else {
            setSwiping(height)
            setReveal(true)
            /*           this.$emit('onReveal', true) */
            setY(0)
        }
    }
    const resetSwipe = () => {

        setSwiping(swiping - 1)
        if (swiping > 0) {
            window.requestAnimationFrame(() => resetSwipe());
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
                {...config}


            >
                <div
                    onTouchEnd={swipeEnd}
                    onTouchMove={swipeMove}
                    onTouchStart={swipeStart}
                >
                    {children}
                </div>

            </Swipeable>

        </div>
    )
}

export default PullDown;