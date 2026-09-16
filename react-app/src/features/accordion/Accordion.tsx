import { useState } from 'react'
import styles from './Accordion.module.css'
import { ChevronDown, ChevronUp } from 'lucide-react';

const data = [
    {
        title: "JavaScript Basics",
        content: "Learn variables, functions, and loops in JavaScript."
    },
    {
        title: "React.js Overview",
        content: "Understand components, state, and props in React."
    },
    {
        title: "Node.js",
        content: "Basics of server-side development with Node.js."
    },
    {
        title: "Full-Stack Development",
        content: "Build full-stack apps with React and Node.js."
    }
]

const Accordion = () => {
    const [expanded, setExpaned] = useState<Record<number, boolean>>({});
    let arr = [10, 20, 30];
    arr[10] = 100;
    arr.forEach(e => console.log(e))

    const toggleExpand = (index: number) => {
        setExpaned(prev => {
            return {
                ...prev,
                [index]: !prev[index]
            }
        });
    }

    return (
        <div className="">
            <h1>Accordion</h1>
            <div className={styles.accordionParent}>
                {
                    data.map((item, index) => (
                        <div className={styles.accordion} key={index}>
                            <div className={styles.accordionTitle} onClick={() => toggleExpand(index)}>
                                <span>{item.title}</span>
                                {expanded[index] ? <ChevronUp /> : <ChevronDown />}
                            </div>
                            {
                                expanded[index] &&
                                <div className={styles.accordionContent}>{item.content}</div>
                            }
                        </div>)
                    )
                }
            </div>
        </div>
    )
}

export default Accordion