import type { ChangeEvent } from 'react';
import styles from '../TabForm.module.css'
import type { TabProps } from '../types';

type ProfileField = "name" | "email" | "age";

const Profile = ({ data, setData, error }: TabProps) => {
    const { name, email, age } = data;

    const handleChange = (e: ChangeEvent<HTMLInputElement>, item: ProfileField) => {
        setData((prevData) => ({
            ...prevData,
            [item]: e.target.value,
        }))
    }

    return (
        <div className={styles.profile}>
            <div>
                <label>
                    Name:
                    <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => handleChange(e, "name")} />
                </label>
                {error.name && <span className={styles.errorText}>{error.name}</span>}
            </div>
            <div>
                <label>
                    Email:
                    <input type='email' placeholder='Email' name='email' value={email} onChange={(e) => handleChange(e, "email")} />
                </label>
                {error.email && <span className={styles.errorText}>{error.email}</span>}
            </div>
            <div>
                <label>
                    Age:
                    <input type='number' placeholder='Age' name='age' value={age} onChange={(e) => handleChange(e, "age")} />
                </label>
                {error.age && <span className={styles.errorText}>{error.age}</span>}
            </div>
        </div >
    )
}

export default Profile