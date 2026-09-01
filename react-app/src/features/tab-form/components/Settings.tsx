import type { ChangeEvent } from "react";
import type { TabProps } from "../types";

const Settings = ({ data, setData }: TabProps) => {
    const { theme } = data;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData(prevData => ({
            ...prevData,
            theme: e.target.value
        }))
    }

    return (
        <div>
            <div>
                <label>
                    Dark
                    <input type="radio" value="dark" name="dark" checked={theme === "dark"} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Light
                    <input type="radio" value="light" name="light" checked={theme === "light"} onChange={handleChange} />
                </label>
            </div>
        </div>
    )
}

export default Settings