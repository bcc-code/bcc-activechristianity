import * as React from 'react'
import Link from '@/components/CustomLink'
import Dropdown, { IDropdownProps } from '@/components/Dropdown'


export interface IButtonGroupItem {
    isDropdown: boolean
    single?: {
        slug: string
        active?: boolean
        label: string
    }
    dropdown?: IDropdownProps
}


const ButtonGroup: React.FC<{ buttons: IButtonGroupItem[] }> = ({ buttons }) => {
    const lastIndex = buttons.length - 1

    return (

        <div className="text-xs sm:text-base flex items-center bg-d4athens w-full sm:w-auto font-roboto">
            {buttons.map(({ isDropdown, single, dropdown }, i) => {
                const isActive = single ? single.active === true : dropdown && dropdown.selected !== undefined
                return (
                    <div key={i} className={`flex-1 border ${isActive ? 'bg-white' : ''} ${isDropdown ? 'flex justify-between' : ''} ${i === 0 ? 'rounded-l-lg border-r-0' : ''} ${i === lastIndex ? 'rounded-r-lg border-r' : ''} ${i !== 0 && i !== lastIndex ? 'border-r-0' : ''}`}>
                        {single && (
                            <Link to={single.slug} className={`w-full ${single.active ? 'font-bold' : ''}`}>
                                <span className="block pl-4 p-2 sm:px-4 sm:py-3">{single.label}</span>
                            </Link>
                        )}
                        {dropdown && (
                            <Dropdown
                                {...dropdown}
                            />
                        )

                        }
                    </div>
                )
            })}
        </div>

    )
}

export default ButtonGroup