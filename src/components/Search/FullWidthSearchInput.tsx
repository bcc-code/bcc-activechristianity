import * as React from 'react';
import SearchIcon from '../Icons/Search'
interface ISearch {
    handleSubmit: (query: string) => void
}
const Search: React.FC<ISearch> = ({ handleSubmit }) => {
    const [query, setQuery] = React.useState<string>('')
    const handleChange = (e: any) => {
        setQuery(e.target.value)
    }
    const handleKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleSubmit(query)
        }
    }
    return (
        <div className="py-1 px-3 bg-gray-200 text-gray-800 flex items-center rounded-lg">
            <span><SearchIcon /></span>
            <input
                className="font-medium flex-1 mx-3 py-1 h-full bg-gray-200 text-2xl max-w-full"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}

export default Search