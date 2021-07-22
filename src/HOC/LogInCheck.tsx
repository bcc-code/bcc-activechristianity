import * as React from 'react';
import { useSelector } from 'react-redux'
import { ILogginStatus } from '@/state/types'
import { loggedInSelector } from '@/state/selectors/user'

interface IProps {
    render: (data: { loginStatus: ILogginStatus }) => JSX.Element
}

const FollowTopic: React.FC<IProps> = ({ render }) => {
    const loginStatus = useSelector(loggedInSelector)
    return (
        <>
            {render({ loginStatus })}
        </>
    )
}

export default FollowTopic