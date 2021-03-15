import React from 'react'
import TopImgPost from '@/components/PostItemCards/TopImg'
import { OneTopImgPost } from '@/components/Loader/PlaceHolders'
import XScroll from './BaseLarge'
import './horizontal-scroll.css';
import { IPostItem } from '@/types'
import shortid from 'shortid'
import { getRandomArray } from '@/helpers/normalizers'
const FeatureSection: React.FC<{ featured: IPostItem[] }> = ({ featured }) => {

    const [mixed, setMixed] = React.useState<null | IPostItem[]>(null)

    React.useEffect(() => {
        const random = getRandomArray(featured, featured.length)
        setMixed(random)
    }, [])

    return (
        <OneTopImgPost
            loading={mixed === null}
        >
            {mixed !== null && (
                <XScroll items={mixed.map((post) => (
                    <TopImgPost
                        key={shortid()}
                        {...post}
                        noBorder
                        noBg
                        showType
                    />
                ))}

                />
            )}
        </OneTopImgPost>
    )
}

export default FeatureSection