import * as React from "react"
import { useSwipeable } from "react-swipeable"
import OutlineNoImagePost from '@/components/PostItem/OutLineNoImgPost'
import { IPostItem } from '@/types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './StackCards.css';

const Stack: React.FC<{ cards: IPostItem[] }> = ({ cards }) => {

    const [currentIndex, setCurrentIndex] = React.useState<number>(0);
    const nextIndex = (currentIndex + 1) % cards.length
    const thridIndex = (currentIndex + 2) % cards.length

    const showNextCard = () => {
        setCurrentIndex(nextIndex)
    }

    const handlers = useSwipeable({
        onSwipedLeft: showNextCard,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="latest-cards relative"{...handlers}>
            <TransitionGroup >
                <CSSTransition
                    timeout={700}
                    key={thridIndex}
                    classNames="card-stack"
                    className="prev-card bg-gray-300 card rounded-xxl sm:rounded-xl"
                >
                    <div>
                        <OutlineNoImagePost {...cards[thridIndex]} />
                    </div>
                </CSSTransition>
                <CSSTransition
                    timeout={700}
                    key={nextIndex}
                    classNames="card-stack"
                    className="next-card bg-gray-100 card rounded-xxl sm:rounded-xl"
                >
                    <div>
                        <OutlineNoImagePost {...cards[thridIndex]} />
                    </div>

                </CSSTransition>
                <CSSTransition
                    timeout={700}
                    key={currentIndex}
                    classNames="card-stack"
                    className="current-card bg-white card rounded-xxl sm:rounded-xl"
                >
                    <div>
                        <OutlineNoImagePost {...cards[thridIndex]} />
                    </div>
                </CSSTransition>
            </TransitionGroup >
        </div>
    )
}

export default Stack