import {Link} from "react-router-dom";
import {LabelProps} from "../interfaces/LabelProps";

function Label({text, href, hrefText}: LabelProps) {
    return (
        <p className="mt-10 text-center text-sm text-gray-500">
            {text}
            {href && <Link to={href} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                {hrefText}
            </Link>}
        </p>
    )
}

export default Label;