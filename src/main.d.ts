declare module "*.png" {
    const content: string;
    export default content;
}
declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.jpg" {
    const content: string;
    export default content;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "html2plaintext" {
    export default (value: string): string => { };
}

declare module '@microlink/react'
declare module 'react-html-parser'
declare module 'react-media-player'
declare module 'react-scroll-section';

declare module 'share-this/dist/sharers/twitter'
declare module 'share-this/dist/sharers/facebook'
declare module 'share-this/dist/sharers/email'
declare module 'share-this/src/render'
declare module 'share-this/src/popover'