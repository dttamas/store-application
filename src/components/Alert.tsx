import {AlertProps} from "../interfaces/AlertProps";
import {IoClose} from "react-icons/io5";

function Alert({ type, message, onClose }: AlertProps) {
    return (
        <div className={type} role="alert">
            <span className="block sm:inline text-sm">{message}</span>
            <div className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <IoClose size={25} onClick={onClose} />
            </div>
        </div>
    )
}

export default Alert;