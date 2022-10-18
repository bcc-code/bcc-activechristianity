import { ReactNode, HTMLProps } from 'react';
declare type Props = {
    id: string;
    meta?: unknown;
    children: ReactNode;
} & HTMLProps<HTMLDetailsElement>;
export declare const Section: ({ id, children, meta, ...rest }: Props) => JSX.Element;
export {};
