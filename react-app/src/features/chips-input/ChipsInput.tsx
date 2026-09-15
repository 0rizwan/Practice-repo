import styles from './ChipsInput.module.css';
import '../../App.css';
import { type ChangeEvent, useState } from 'react';

type chipsType = {
    id: string,
    name: string
}

const ChipsInput = () => {
    const [input, setInput] = useState("");
    const [chips, setChips] = useState<chipsType[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        if (e.key === "Enter" && input.trim() !== "") {
            setChips(prev => [...prev, { id: Date.now().toString(), name: input }]);
            setInput("");
        }
    }

    const removeChips = (id: string) => {
        console.log(chips)
        setChips(prev => prev.filter(item => item.id !== id));
    }

    return (
        <div className='App'>
            <h1>Chips Input</h1>
            <input
                className={styles.input}
                type='text'
                placeholder='Type here...'
                value={input}
                onChange={handleChange}
                onKeyDown={handleSubmit}
            />
            <div className={styles.chipsContainer}>
                {
                    chips.map((chip) => {
                        return (
                            <div key={chip.id} className={styles.chip}>
                                {chip.name}
                                <span role='button' className={styles.crossBtn} onClick={() => removeChips(chip.id)}>X</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChipsInput