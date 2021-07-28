import React from "react";
import shortid from 'shortid'
import SquareCard from '@/components/Cards/BgImgTopicCard'
import { ITopic } from '@/types'
import ac_strings from '@/strings/ac_strings.js'
// Type

const Section: React.FC<{ formats: ITopic[] }> = ({ formats }) => {
    return (
        <div className="sm:pt-6">
            <h3 className="hidden sm:block relative mt-8 mb-2 sm:mb-8 pb-2 text-d4dark text-base sm:border-b">
                {ac_strings.categories}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 px-4 sm:px-0 ">

                {formats.map((card) => card.image ? (
                    <div className="pb-square w-full relative">
                        <div className="absolute inset-0">
                            <SquareCard
                                key={shortid()}
                                to={card.slug}
                                image={card.image}
                                name={card.name}
                                fontClass={`${card.name.length > 20 ? 'text-sm' : 'text-base'} sm:text-lg`}
                            />
                        </div>

                    </div>
                ) : null)}
            </div>

        </div>
    )
}

export default Section