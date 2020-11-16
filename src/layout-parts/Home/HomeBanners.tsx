import * as React from 'react'
import { IBannerBasic } from '@/types'
export const HomeTop: React.FC<IBannerBasic> = ({ title, body, cta }) => (
    <div className="bg-gray-400">
        <div className="standard-max-w" style={{ minHeight: "500px", paddingTop: "122px" }}>
            <div className="px-4 w-7/12">
                <h2 className="text-6xl font-bold pb-12">{title}</h2>

                <p className="text-2xl pb-12">{body}</p>
                <button
                    className="font-bold bg-white px-8 py-4 rounded-lg text-lg"
                >
                    {cta.text} >
                </button>
            </div>
        </div>
    </div>
)