import { useState } from 'react';
import styles from './NestedCheckbox.module.css'

const checkboxData: NodeType[] = [
    {
        "id": "1",
        "name": "Parent 1",
        "children": [
            {
                "id": "2",
                "name": "Parent 2",
                "children": [
                    {
                        "id": "3",
                        "name": "Child 1",
                        "children": [
                            {
                                "id": "4",
                                "name": "Child 2",
                                "children": [
                                    {
                                        "id": "5",
                                        "name": "Grand Child 1",
                                    },
                                    {
                                        "id": "6",
                                        "name": "Grand Child 2",
                                    }
                                ]
                            },
                            {
                                "id": "7",
                                "name": "Child 3",
                            },
                            {
                                "id": "8",
                                "name": "Child 4",
                            }
                        ]
                    }
                ]
            },
            {
                "id": "9",
                "name": "Parent 3",
            },
            {
                "id": "10",
                "name": "Parent 4",
            }
        ]
    }
];

type NodeType = {
    id: string,
    name: string,
    children?: NodeType[]
}

type ComponentProps = {
    nodes: NodeType[],
    checked: Record<string, boolean>,
    handleOnChange: (isChecked: boolean, node: NodeType) => void
}

type CheckedType = Record<string, boolean>

const CheckboxComponent = ({ nodes, checked, handleOnChange }: ComponentProps) => {

    return nodes.map((node) => (
        <div key={node.id}>
            <input
                type='checkbox'
                checked={checked[node.id] || false}
                onChange={(e) => handleOnChange(e.target.checked, node)}
            />
            <span>{node.name}</span>
            {
                node.children &&
                <div className={styles.children}>
                    <CheckboxComponent nodes={node.children} checked={checked} handleOnChange={handleOnChange} />
                </div>
            }
        </div>
    ))
}

const NestedCheckbox = () => {
    const [checked, setChecked] = useState<CheckedType>({});

    const handleOnChange = (isChecked: boolean, node: NodeType) => {
        setChecked(prev => {
            let newState = { ...prev };

            const updateChildren = (node: NodeType) => {
                newState[node.id] = isChecked;
                node.children?.forEach((child) => {
                    updateChildren(child);
                })
            }
            updateChildren(node);

            const verifyChecked = (node: NodeType): boolean => {
                if (!node.children) {
                    return newState[node.id] || false;
                }
                let allChildrenChecked: boolean = node.children.every((child) => {
                    return verifyChecked(child);
                });
                newState[node.id] = allChildrenChecked;
                return allChildrenChecked;
            }
            checkboxData.forEach((node) => verifyChecked(node));

            return newState;
        });
    }

    return (
        <div>
            <h1>Nested Checkbox</h1>
            <CheckboxComponent nodes={checkboxData} checked={checked} handleOnChange={handleOnChange} />
        </div>
    )
}

export default NestedCheckbox