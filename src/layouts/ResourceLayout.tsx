import React from 'react'


interface IProps {
    title: string
}
const ResourceLayout: React.FC<IProps> = ({ children, title }) => {
    return (
        <div>
            <div className="py-10 sm:mb-8">

                <h1 className="standard-max-w-px font-semibold hidden sm:block sm:text-2xl md:text-3xl pb-6">{title}</h1>

                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ResourceLayout