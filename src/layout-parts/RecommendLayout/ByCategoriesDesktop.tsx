
import React from "react"
import Link from '@/components/CustomLink'
import { OutlineRightIcon } from "@/components/Button"
import { INavItem } from "@/types"
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI'
export interface ITypeCount extends INavItem {
    count?: number
}
interface IByTaxonomies {
    types: ITypeCount[]
    title: string
    count?: number | string
    arrow?: boolean
    col?: number
    icon?: JSX.Element
}

const ByTaxonomies: React.FC<IByTaxonomies> = ({ types, title, arrow, col, icon }) => {
    console.log(types)
    return (
        <div className="bg-d4athens sm:bg-white py-4">
            <div className="standard-max-w">
                <div className="font-bold relative flex justify-between mt-8 sm:mt-16 mb-2 sm:mb-8 pb-2 text-d4dark text-base">
                    <span className="block text-lg">{title}</span>
                </div>

                <div className={`hidden sm:grid grid-cols-${col ? col : '2'} gap-4 mt:4 sm:mt-12 mb-4`}>
                    {types.map(({ to, name, count }, key) => {
                        return count && count > 0 ? (
                            <OutlineRightIcon key={key} name={name} to={to} count={arrow ? undefined : count} arrow={arrow} />
                        ) : null

                    })}
                </div>
                <div className="flex flex-col sm:hidden">
                    {types.map(({ to, name, count }, key) => {
                        return (
                            <Link key={key} className="border-b w-full py-2 flex justify-between items-center pr-2" to={to}>
                                <span>{name}</span>
                                <KeyboardArrowRightIcon customSize="4" className="fill-slate-dark" />
                            </Link>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ByTaxonomies