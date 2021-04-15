import React from 'react'
import { KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons'
import Link from '@/components/CustomLink'
interface IProps {
    currentPage: number;
    totalPages: number;
    onChange: Function
    getLinkPath: Function

}
const PostList: React.FC<IProps> = (props) => {

    const { currentPage, totalPages, onChange, getLinkPath } = props
    const [pageInput, setPageInput] = React.useState(currentPage)
    React.useEffect(() => {
        setPageInput(currentPage)
    }, [currentPage])
    const handleInputChange = (e: any) => {
        e.preventDefault();
        setPageInput(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onChange(pageInput)
    }

    return (
        <div className="flex justify-center text-gray-500 font-roboto">
            <Link className="bg-ac-slate-lighter rounded  p-2 mr-2"
                to={getLinkPath(currentPage - 1)}
            >
                <KeyboardArrowLeftIcon />
            </Link>
            <form
                onSubmit={handleSubmit}
                className="flex border rounded py-1 overflow-hidden">
                <input type="text" className="w-8 text-center text-ac-slate-dark text-sm" value={pageInput} onChange={handleInputChange} />
            </form>
            <div className="flex items-center p-2 ">
                <span className=" block text-xs align-middle"> / {totalPages}</span>
            </div>
            <Link className="bg-ac-slate-lighter rounded  p-2"
                to={getLinkPath(currentPage + 1)}
            >
                <KeyboardArrowRightIcon />
            </Link>
        </div>
    )
}

export default PostList