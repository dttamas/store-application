import React from 'react';
import HeadLabel from "./HeadLabel";
import {ContainerProps} from "../interfaces/ContainerProps";

function Container( { children, headerText, headerImgSrc, headerAlt }: ContainerProps ){
    return (
        <div className="flex flex-col justify-center px-6 py-4 lg:px-8 items-center">
            <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
                {headerText && <HeadLabel text={headerText} imgSrc={headerImgSrc} alt={headerAlt}/>}
                {children}
            </div>
        </div>
    )
}

export default Container;