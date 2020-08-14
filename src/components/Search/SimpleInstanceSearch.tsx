import * as React from 'react';
import Link from '@/components/CustomLink'
import { INavItem } from '@/types'
import SearchInput from './index'
interface IProps {
    handleChange: (query: string) => void
    result: INavItem[]
}

export const getFilteredResult = (searchIndex: INavItem[], query: string) => {
    return query.length > 1 ? searchIndex.filter(({ name }) => {
        return name.toLowerCase().indexOf(query.toLowerCase()) > -1
    }) : []
}
const SimpleInstanceSearch: React.FC<IProps> = ({ handleChange, result }) => {
    const [query, setQuery] = React.useState("")
    const onChange = (e: any) => {

        setQuery(e.target.value)
        handleChange(e.target.value)
    }

    const onCancel = () => {
        setQuery("")
        handleChange("")
    }

    return (
        <div className="relative">
            <SearchInput
                placedholderText="Search"
                onChange={onChange}
                clearInput={onCancel}
                value={query}
            />
            {result.length > 0 && (
                <ul className="absolute flex flex-col bg-white p-4 shadow" style={{ top: "4.3rem", left: "1rem", right: "0" }}>
                    {result.map(({ to, name }, i) => {
                        return (
                            <Link className="py-2" key={i} to={`/${to}`}>
                                {name}
                            </Link>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default SimpleInstanceSearch