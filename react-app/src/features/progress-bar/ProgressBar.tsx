import { useReducer } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBarComponent = ({ progress }: { progress: number }) => {

    return (
        <div className={styles.outer}>
            <div
                style={{
                    // width: `${progress}%`,
                    transform: `translateX(${progress - 100}%)`,
                    color: progress < 5 ? 'black' : 'white'
                }}
                className={styles.inner}
                role='progressbar'
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {progress}%
            </div>
        </div>
    )
}

type State = {
    progress: number;
}

type Action = {
    type: "increment" | "decrement";
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "increment":
            return {
                progress: state.progress + 10
            };

        case "decrement":
            return {
                progress: state.progress - 10
            };
    }
}

const ProgressBar = () => {
    const [state, dispatch] = useReducer(reducer, { progress: 0 });

    return (
        <div>
            <h1>Progress Bar</h1>
            <ProgressBarComponent progress={state.progress} />
            <button disabled={state.progress <= 0} onClick={() => dispatch({ type: "decrement" })}>- 10%</button>
            <button disabled={state.progress >= 100} onClick={() => dispatch({ type: "increment" })}>+ 10%</button>
        </div>
    )
}

export default ProgressBar