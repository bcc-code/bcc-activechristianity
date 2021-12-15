import * as React from 'react';
import { HScrollBaseLarge } from '@/components/HorizontalScroll';
import PostItemCard from '@/layout-parts/HomeNew/PostItemCard';
import SectionWrapperSmall from '@/layout-parts/HomeNew/SectionWrapperSmall';
import { IThemeName } from '@/components/CustomizedPageComponent/BlockWrapper';
import shortid from 'shortid';
// Type
import { IPostItem } from '@/types';

export const CardListPosts: React.FC<{
    posts: IPostItem[];
    title: string;
    cta: { name: string; to: string };
    theme?: IThemeName;
    bgImg?: string;
}> = ({ posts, title, cta, theme, bgImg }) => {
    return (
        <SectionWrapperSmall title={title} cta={cta} theme={theme} bgImg={bgImg}>
            <div className="-mx-4">
                <HScrollBaseLarge
                    items={posts.map(item => {
                        return <PostItemCard key={shortid()} {...item} />;
                    })}
                />
            </div>
            <div className="mx-auto standard-max-w w-full hidden sm:grid grid-cols-4 gap-3 pb-4">
                {posts.map(item => {
                    return <PostItemCard key={shortid()} {...item} />;
                })}
            </div>
        </SectionWrapperSmall>
    );
};

export default CardListPosts;
