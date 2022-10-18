import { RefObject } from 'react';
export declare type Section = {
    ref: RefObject<HTMLElement>;
    meta: unknown;
};
export declare type ScrollContextType = {
    registerRef: (args: {
        id: string;
        meta: unknown;
    }) => RefObject<HTMLElement> | null;
    unregisterRef: (id: string) => void;
    scrollTo: (section: string) => void;
    sections: Record<string, Section>;
    selected: string;
};
export declare const ScrollContext: import("react").Context<ScrollContextType>;
export declare const Consumer: import("react").Consumer<ScrollContextType>, Provider: import("react").Provider<ScrollContextType>;
