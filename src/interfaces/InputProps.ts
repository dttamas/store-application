import {ChangeEvent} from "react";

export interface InputProps {
    name: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    label?: string;
}