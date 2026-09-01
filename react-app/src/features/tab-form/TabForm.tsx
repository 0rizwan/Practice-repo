import Profile from './components/Profile'
import Interests from './components/Interests'
import Settings from './components/Settings'
import { useState } from 'react'
import styles from './TabForm.module.css'
import type { DataType, ErrorType, TabType } from './types'

const TabForm = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [error, setError] = useState<ErrorType>({});
    const [data, setData] = useState<DataType>({
        "name": "john",
        "email": "john@gmail.com",
        "age": 24,
        "interest": ["football", "swimming", "coding"],
        "theme": "dark"
    });
    const tabs: TabType[] = [
        {
            "name": "Profile",
            "component": Profile,
            "validation": () => {
                let err: ErrorType = {};
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
                let err: ErrorType = {};
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
    ];

    const changeTab = (tabIndex: number) => {
        if (tabs[currentTab].validation()) {
            setCurrentTab(tabIndex);
        }
    }

    const handlePrev = () => {
        setCurrentTab(prev => Math.max(prev - 1, 0));
    }

    const handleNext = () => {
        if (tabs[currentTab].validation()) {
            setCurrentTab(prev => Math.min(prev + 1, tabs.length - 1));
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