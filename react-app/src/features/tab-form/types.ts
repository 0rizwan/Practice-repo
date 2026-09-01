import type { ComponentType, Dispatch, SetStateAction } from "react";

export type DataType = {
    name: string;
    email: string;
    age: number;
    interest: string[];
    theme: string;
}

export type TabProps = {
    data: DataType;
    setData: Dispatch<SetStateAction<DataType>>;
    error: ErrorType;
}

export type TabType = {
    name: string;
    component: ComponentType<TabProps>;
    validation: () => boolean;
}

export type ErrorType = {
    name?: string;
    email?: string;
    age?: string;
    interest?: string;
}