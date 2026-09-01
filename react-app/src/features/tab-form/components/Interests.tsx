import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from '../TabForm.module.css';
import type { dataType } from '../TabForm';

const Interests = ({ data, setData, error }: { data: dataType, setData: Dispatch<SetStateAction<dataType>>, error: {} }) => {
  const { interest } = data;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevVal) => ({
      ...prevVal,
      interest: e.target.checked ?
        [...prevVal.interest, e.target.name] :
        prevVal.interest.filter(item => item !== e.target.name)
    }))
  }

  return (
    <div className={styles.profile}>
      <div>
        <label>
          Football:
          <input type='checkbox' name='football' checked={interest.includes("football")} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Swimming:
          <input type='checkbox' name='swimming' checked={interest.includes("swimming")} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Coding:
          <input type='checkbox' name='coding' checked={interest.includes("coding")} onChange={handleChange} />
        </label>
      </div>
      {error.interest && <span className={styles.errorText}>{error.interest}</span>}
    </div>
  )
}

export default Interests