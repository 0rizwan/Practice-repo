import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import styles from './OtpInput.module.css';

const OTP_INPUT_SIZE = 4;

const OtpInput = () => {
    const [otp, setOtp] = useState(new Array(OTP_INPUT_SIZE).fill(""));
    const refArr = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        refArr.current[0]?.focus();
    }, [])

    const handleOnChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        let trimmedVal = value.trim();
        let tempArr = [...otp];
        tempArr[index] = trimmedVal.slice(-1);
        setOtp(tempArr);

        // Move the focus next
        if (trimmedVal && index < OTP_INPUT_SIZE - 1) {
            refArr.current[index + 1]?.focus();
        }

        // Backspace fn
        // if (!trimmedVal && index > 0) {
        //     refArr.current[index - 1]?.focus();
        // }
    }

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!e.currentTarget.value && e.key === "Backspace") {
            refArr.current[index - 1]?.focus();
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>OTP Input</h1>
            {
                otp.map((_, index) => (
                    <input
                        key={index}
                        type='text'
                        className={styles.otpInput}
                        ref={(input) => {
                            refArr.current[index] = input
                        }}
                        value={otp[index]}
                        onChange={(e) => handleOnChange(e.target.value, index)}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                    />
                ))
            }
        </div>
    )
}

export default OtpInput