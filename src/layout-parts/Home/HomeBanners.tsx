import * as React from 'react'
import { IBannerBasic } from '@/types'
import Link from '@/components/CustomLink'
export const HomeTop: React.FC<IBannerBasic & { darkbg?: boolean }> = ({ title, body, cta, bgImg, label, darkbg }) => (
    <div style={{ backgroundImage: `url(${bgImg ? bgImg : `https://source.unsplash.com/random/1600x800`})`, backgroundSize: "cover" }}>
        <div className="standard-max-w" style={{ minHeight: "500px", paddingTop: "72px" }}>
            <div className={`px-4 w-7/12 ${darkbg ? 'text-white' : ''}`}>
                <span className="uppercase">{label}</span>
                <h2 className="text-6xl font-bold pb-12">{title}</h2>
                <p className="text-2xl pb-12">{body}</p>
                <Link
                    className="font-bold bg-white px-8 py-4 rounded-lg text-lg text-ac-slate-dark"
                    to={cta.path}
                >
                    {cta.text}
                </Link>
            </div>
        </div>
    </div >
)