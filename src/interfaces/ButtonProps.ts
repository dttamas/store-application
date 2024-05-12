export interface ButtonProps {
    type?: "submit" | "reset" | "button" | undefined
    text?: string;
    onClick?: () => void;
    disabled?: boolean;
}