import * as React from 'react';
import Lazysizes from '@/components/Images/LazysizesImage'
import { IImage } from '@/types'
import Read from '@/templates/recommend/read-recommend';

interface IState {
    isFullWidth: boolean
}
class LazysizesImg extends React.Component<IImage, IState> {

    refElem: any
    constructor(props: IImage) {
        super(props);
        this.refElem = React.createRef();
        this.state = ({ isFullWidth: false })
    }

    componentDidMount() {
        console.log(this.refElem)
        if (this.refElem.current) {
            console.log(this.refElem.current.clientWidth)
            console.log(this.refElem.current.clientHeight)
        }
    }

    render() {
        return (
            <div ref={this.refElem} className="absolute inset-0">
                <Lazysizes
                    {...this.props}

                    className={`z-0 absolute inset-0 overflow-hidden bg-center bg-cover w-full h-auto`}
                />
            </div>
        );
    }
}

const LazySizeImageBg: React.FC<IImage> = (image) => {
    const [isFullWidth, setIsFullWidth] = React.useState<null | boolean>(null)
    const refElem = React.useRef(null)
    React.useEffect(() => {
        if (refElem.current) {
            const height = refElem.current.clientHeight
            const width = refElem.current.clientWidth
            console.log()
            console.log(refElem.current.clientHeight)
            console.log(refElem.current.scrollWidth)
            console.log(refElem.current.offsetWidth)
            console.log(height / width)
            setIsFullWidth((height / width) <= 0.7)
        }
    }, [refElem.current])
    console.log(refElem)
    return (
        <div ref={refElem} className="absolute inset-0">
            <Lazysizes
                {...image}

                className={`z-0 absolute inset-0 overflow-hidden bg-center bg-cover ${isFullWidth ? 'w-full h-auto' : 'h-full w-auto'}`}
            />
        </div>

    )
}

export default LazysizesImg