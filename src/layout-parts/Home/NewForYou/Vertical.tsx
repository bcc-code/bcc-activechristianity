import * as React from "react"
import NewForYouHeader from './header'
import LeftIconPost, { ILeftIconPost } from '@/components/PostItem/LeftIconPost'

import './NewForYou.css'


interface IProps {
    topics: ILeftIconPost[]
}
const NewForYou: React.FC<IProps> = ({ topics }) => {

    return (

        <div className="p-4 rounded-lg" style={{ backgroundImage: 'linear-gradient(#EDF1FA,#fff)' }}>
            <NewForYouHeader />
            <div className="flex flex-col">
                {topics.slice(0, 3).map((topic, i) => {
                    return <LeftIconPost  {...topic} key={i} />
                })}
            </div>

        </div>
    )
}

export default NewForYou