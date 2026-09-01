import Profile from './components/Profile'
import Interests from './components/Interests'
import Settings from './components/Settings'
import { useState, type Dispatch, type SetStateAction } from 'react'
import styles from './TabForm.module.css'

type tabType = {
    name: string;
    component: (props: { data: dataType; setData: Dispatch<SetStateAction<dataType>>, error: {} }) => React.JSX.Element;
    validation: () => boolean;
}

export type dataType = {
    name: string;
    email: string;
    age: number;
    interest: string[];
    theme: string;
}

const TabForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [error, setError] = useState({});
    const [data, setData] = useState<dataType>({
        "name": "john",
        "email": "john@gmail.com",
        "age": 24,
        "interest": ["football", "swimming", "coding"],
        "theme": "dark"
    });
    const tabs: tabType[] = [
        {
            "name": "Profile",
            "component": Profile,
            "validation": () => {
                let err = {};
                if (!data.name || data.name.length < 3) {
                    err.name = "Name is not valid";
                }
                if (!data.email || data.email.length < 3) {
                    err.email = "Email is not valid";
                }
                if (!data.age || data.age < 18) {
                    err.age = "Age is not valid";
                }
                setError(err);
                return err.name || err.email || err.age ? false : true;
            }
        },
        {
            "name": "Interests",
            "component": Interests,
            "validation": () => {
                let err = {};
                if (data.interest.length < 1) {
                    err.interest = "Select any one interest";
                }
                setError(err);
                return err.interest ? false : true;
            }
        },
        {
            "name": "Settings",
            "component": Settings,
            "validation": () => true
        },
    ]
    const changeTab = (tabIndex: number) => {
        if (tabs[currentTab].validation()) {
            setCurrentTab(tabIndex);
        }
    }
    const handlePrev = () => {
        if (tabs[currentTab].validation()) {
            setCurrentTab(prev => prev - 1)
        }
    }
    const handleNext = () => {
        if (tabs[currentTab].validation()) {
            setCurrentTab(prev => prev + 1)
        }
    }
    const CurrentTab = tabs[currentTab].component;

    return (
        <div>
            <h2>Tab Form</h2>
            <div style={{ padding: '10px' }}>
                {tabs.map((tab, index) =>
                    <button
                        key={tab.name}
                        style={{ background: index == currentTab ? "lightBlue" : "" }}
                        onClick={() => changeTab(index)}>
                        {tab.name}
                    </button>
                )}
                <div className={styles.tabContainer}>
                    <CurrentTab data={data} setData={setData} error={error} />
                </div>
                <div className={styles.btnContainer}>
                    {
                        currentTab !== 0 &&
                        <button onClick={handlePrev}>Prev</button>
                    }
                    {
                        currentTab === tabs.length - 1 ?
                            <button onClick={() => alert(JSON.stringify(data))}>Submit</button> :
                            <button onClick={handleNext}>Next</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TabForm