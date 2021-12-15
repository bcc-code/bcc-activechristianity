import React from 'react';
import Link from '@/components/CustomLink';
import SquareImages from '@/components/Images/Image2To1';
import { IImage } from '@/types';
import { LayoutH1 } from '@/components/Headers';
import MetaTag from '@/components/Meta';
import ac_strings from '@/strings/ac_strings.js';
import { navigate } from 'gatsby';
import Pagination from '@/components/Pagination';
import { trimSlug } from '@/helpers/index-js';

const Themes = props => {
    console.log(props);
    const { pageContext, pagePath } = props;
    const { themes, paginate } = pageContext;
    /*     const pageInfo = data.ac.allPages;
    const themePages = pageInfo.filter(page => page.parent && `${page.parent.id}` === `75`);
    console.log(themePages); */
    const title = 'Bible Studies';
    const handleChange = (nr: number) => {
        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            const fullPath = getLinkPath(nr);
            scrollToTop();
            navigate(fullPath);
        }
    };

    const getLinkPath = (nr: number) => {
        let activePage = nr;
        let toReturnPath = '/';
        if (typeof nr === 'string') {
            activePage = parseInt(nr);
        }

        if (paginate && nr < paginate.totalPages + 1 && nr > -1) {
            toReturnPath = activePage > 1 ? `/${trimSlug(paginate.baseUrl)}/${activePage}` : paginate.baseUrl;
        }
        return toReturnPath;
    };

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="max-w-tablet mx-auto pt-6 px-4 tablet:px-0">
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={[]} path={pagePath} />
            <LayoutH1 title={title} />
            <div className="hidden sm:block">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  grid-h70  gap-x-4 gap-y-6 py-8">
                    {themes.map(p => {
                        return (
                            <SimpleSolidCardNew
                                key={p.slug}
                                image={p.image}
                                title={p.title}
                                to={`${ac_strings.slug_theme}/${p.slug}`}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="sm:hidden">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  grid-h70  gap-4 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12 py-8">
                    {themes.map(p => {
                        return (
                            <SimpleSolidCardNew
                                key={p.slug}
                                image={p.image}
                                title={p.title}
                                to={`${ac_strings.slug_theme}/${p.slug}`}
                            />
                        );
                    })}
                </div>
            </div>
            {paginate && (
                <div className="flex justify-item py-4">
                    <Pagination
                        currentPage={paginate.currentPage}
                        totalPages={paginate.totalPages}
                        getLinkPath={getLinkPath}
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Themes;

export interface ISimpleSolidCard {
    title: string;
    to: string;
    className?: string;
    image: IImage;
}

export const SimpleSolidCardNew: React.FC<ISimpleSolidCard> = ({ title, to, image }) => {
    const overlayStyle = {
        dark: { background: '#020203', opacity: '0.3' },
        light: { background: '#9CA6BE', opacity: '0.68' },
        medium: { background: '#384156', opacity: '0.3' }
    };
    return (
        <Link to={`${to}`} className="relative flex flex-col justify-center">
            <div className="absolute  flex flex-col z-20 px-4 text-white items-center w-full">
                {/* <div className="text-xxs pb-4">Bible Study</div> */}
                <h2
                    style={{ textShadow: '2px 2px 5px rgba(105,105,105,0.7)' }}
                    className={'text-2xl clamp3 mb-2 font-bold text-center md:text-xl'}
                >
                    {title}
                </h2>
            </div>
            <div className={`z-10 absolute inset-0 rounded-lg`} style={overlayStyle.dark}></div>
            <SquareImages className="rounded-lg" image={image} />
        </Link>
    );
};
