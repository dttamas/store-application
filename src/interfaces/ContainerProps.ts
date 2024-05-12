import {ReactNode} from "react";

export interface ContainerProps {
    children: ReactNode;
    headerImgSrc?: string;
    headerAlt?: string;
    headerText?: string;
}