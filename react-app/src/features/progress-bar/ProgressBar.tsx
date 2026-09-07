import { useEffect, useReducer, useState } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBarComponent = ({ progress }) => {
    console.log(progress)
    const [animatedProgress, setAnimatedProgress] = useState(0);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAnimatedProgress(progress);
    //     }, 100);
    // }, [progress]);

    return (
        <div className={styles.outer}>
            <div
                style={{
                    // width: `${progress}%`,
                    transform: `translateX(${progress - 100}%)`,
                    color: progress < 5 ? 'black' : 'white'
                }}
                className={styles.inner}
            >
                {progress}%
            </div>
        </div>
    )
}

function reducer(state, action) {
    if (action.type === "increment") {
        return {
            progress: state.progress + 10
        };
    } else {
        return {
            progress: state.progress - 10
        }
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