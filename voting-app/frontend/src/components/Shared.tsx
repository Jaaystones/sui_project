import { FC } from "react";

type TextProps = {
    text: string;
    isError?: boolean;
    isCentered?: boolean
}

export const EcText: FC<TextProps> = ({ text, isError, isCentered }) => {
    const textColor = isError ? "text-red-500" : "text-gray-500";
    const alignment = isCentered ? "text-center" : "";
    return <div className={`${alignment} ${textColor}`}>{text}</div>;
}