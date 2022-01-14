import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem';
import BgImgCard, { IBgImgCard } from '@/layout-parts/HomeNew/BgImgTwoToOneCard';
import shortid from 'shortid';
export default function Header() {
    return (
        <StaticQuery
            query={graphql`
				query HeadingQuery {
					ac {
						page(id: "119") {
							title
							flexibleContent
						}
					}
				}
			`}
            render={data => {
                const { title, flexibleContent } = data.ac.page;
                const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent);
                console.log(componentConfig[0].data.content);
                return (
                    <div className="w-full bg-ac-slate-lighter rounded-lg py-4 pb-8 mb-4">
                        <div className="z-20 relative standard-max-w px-4">
                            <h2 className="text-lg md:text-2xl leading-relaxed font-extrabold py-2">{title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: componentConfig[0].data.content }} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 p-4 gap-4">
                            {componentConfig[1].data.map(item => (
                                <BgImgCard smallText key={shortid()} {...item} />
                            ))}
                        </div>
                    </div>
                );
            }}
        />
    );
}
