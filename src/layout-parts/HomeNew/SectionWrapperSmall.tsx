import * as React from 'react';
import { getTheme, IThemeName } from '@/components/CustomizedPageComponent/BlockWrapper';
import Link from '@/components/CustomLink';

export const SectionWrapperSmall: React.FC<{
    title: string;
    dark?: boolean;
    theme?: IThemeName;
    cta?: { name: string; to: string };
    bgImg?: string;
}> = ({ title, children, dark, theme, cta, bgImg }) => {
    const wrapperStyle: any = {};
    const themeColorClassname = getTheme(theme);
    if (bgImg) {
        wrapperStyle.backgroundImage = `url('${bgImg}')`;
        wrapperStyle.backgroundSize = 'cover';
        wrapperStyle.backgroundPosition = 'center';
    }
    console.log(title);
    console.log(wrapperStyle.backgroundImage);
    return (
        <div className={`relative ${themeColorClassname}`} style={wrapperStyle}>
            <div className="relative z-20 standard-max-w px-4 flex flex-col justify-center py-18">
                <h2 className={` font-extrabold text-center text-4-7xl pb-8 ${dark ? 'text-white' : ''}`}>{title}</h2>
                {children}
                {cta && (
                    <div className="w-full flex justify-center mt-4">
                        <Link
                            className="underline  px-2 py-1 sm:px-2 sm:py-1 md:px-8 md:py-4 rounded-lg text-sm  h-max"
                            to={cta.to}
                        >
                            {cta.name}
                        </Link>
                    </div>
                )}
            </div>
            {bgImg && <div className={`z-10 absolute inset-0`} style={{ background: '#020203', opacity: '0.8' }}></div>}
        </div>
    );
};

export default SectionWrapperSmall;
