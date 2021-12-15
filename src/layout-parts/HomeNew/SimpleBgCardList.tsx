import * as React from 'react';
import { HScrollBaseLarge } from '@/components/HorizontalScroll';
import SectionWrapperSmall from './SectionWrapperSmall';
import BgImgCard, { IBgImgCard } from './BgImgTwoToOneCard';
import { IThemeName } from '@/components/CustomizedPageComponent/BlockWrapper';
import shortid from 'shortid';

const SimpleBgCardList: React.FC<{
    items: IBgImgCard[];
    title: string;
    theme?: IThemeName;
    cta: { name: string; to: string };
    bgImg?: string;
}> = ({ items, title, theme, cta, bgImg }) => {
    return (
        <SectionWrapperSmall title={title} theme={theme} cta={cta} bgImg={bgImg}>
            <div className="-mx-4">
                <HScrollBaseLarge
                    items={items.map(item => {
                        return <BgImgCard key={shortid()} {...item} />;
                    })}
                />
            </div>
            <div className="hidden mx-auto standard-max-w w-full sm:grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 pb-4">
                {items.map(item => {
                    /* return <BibleStudyItemCard {...item} label="Bible Study" start />; */
                    return <BgImgCard key={shortid()} {...item} />;
                })}
            </div>
        </SectionWrapperSmall>
    );
};

export default SimpleBgCardList;
