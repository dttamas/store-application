import {HeadLabelProps} from "../interfaces/HeadLabelProps";

function HeadLabel({ imgSrc, alt, text }: HeadLabelProps) {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
            {imgSrc && <img className="mx-auto h-10 w-auto" src={imgSrc} alt={alt}/>}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{text}</h2>
        </div>
    )
}

export default HeadLabel;