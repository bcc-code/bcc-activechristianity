import React from 'react'
import Icons from '@/components/Icons/Icon'

interface IProps {
    currentPage: number;
    totalPages: number;
    onChange: Function

}
const PostList: React.FC<IProps> = (props) => {

    const { currentPage, totalPages, onChange, } = props
    const [pageInput, setPageInput] = React.useState(currentPage)
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
            <button className="bg-ac-slate-lighter rounded  p-2 mr-2"
                onClick={() => onChange(currentPage - 1)}
                onKeyDown={() => onChange(currentPage - 1)}
            >
                <Icons name="KeyboardArrowLeft" />
            </button>
            <form
                onSubmit={handleSubmit}
                className="flex border rounded py-1 overflow-hidden">
                <input type="text" className="w-8 text-center text-ac-slate-dark text-sm" value={pageInput} onChange={handleInputChange} />
            </form>
            <div className="flex items-center p-2 ">
                <span className=" block text-xs align-middle"> / {totalPages}</span>
            </div>
            <button className="bg-ac-slate-lighter rounded  p-2"
                onClick={() => onChange(currentPage + 1)}
                onKeyDown={() => onChange(currentPage + 1)}
            >
                <Icons name="KeyboardArrowRight" />
            </button>
        </div>
    )
}

export default PostList