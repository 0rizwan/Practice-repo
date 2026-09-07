import { useState, type Dispatch, type SetStateAction } from 'react';
import json from './data.json';
import styles from './FileExplorer.module.css';
import { ChevronDown, ChevronRight, Folder, FolderOpen, File as FileIcon, FilePlus, FolderPlus, Pencil, Trash2 } from 'lucide-react';

type File = {
    id: string,
    name: string,
    isFolder: false,
}

type Folder = {
    id: string,
    name: string,
    isFolder: true,
    children: FileNode[]
}

type FileNode = File | Folder;

type FileTreeProps = {
    nodes: FileNode[],
    setIsAddingNode: Dispatch<SetStateAction<string>>,
    setActiveNode: Dispatch<SetStateAction<string>>,
    removeNode: (nodeId: string) => void
}

const FileTree = ({ nodes, setIsAddingNode, setActiveNode, removeNode }: FileTreeProps) => {
    const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (node: FileNode) => {
        setIsExpanded(prev => ({
            ...prev,
            [node.id]: !prev[node.id]
        }));
    }

    return (
        <div>
            {
                nodes.map((node) => (
                    <div key={node.id} className={styles.fileContainer}>
                        <div className={styles.node}>
                            {node.isFolder ? (
                                <>
                                    {isExpanded[node.id] ? <ChevronDown onClick={() => toggleExpand(node)} /> : <ChevronRight onClick={() => toggleExpand(node)} />}
                                    {isExpanded[node.id] ? <FolderOpen /> : <Folder />}
                                </>
                            ) : (
                                <FileIcon />
                            )}
                            <span>{node.name}</span>
                            <div className={styles.actionIcons}>
                                {
                                    node.isFolder && (
                                        <>
                                            <button
                                                type="button"
                                                title="New File"
                                                onClick={() => {
                                                    setIsAddingNode("file");
                                                    setActiveNode(node.id);
                                                }}>
                                                <FilePlus size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                title="New Folder"
                                                onClick={() => {
                                                    setIsAddingNode("folder");
                                                    setActiveNode(node.id);
                                                }}>
                                                <FolderPlus size={18} />
                                            </button>
                                        </>
                                    )}
                                <button type="button" title="Edit">
                                    <Pencil size={18} />
                                </button>
                                <button
                                    type="button"
                                    title="Delete"
                                    onClick={() => {
                                        const message = node.isFolder
                                            ? `Are you sure you want to delete the folder "${node.name}" and all of its contents?`
                                            : `Are you sure you want to delete "${node.name}"?`;

                                        if (window.confirm(message)) {
                                            removeNode(node.id);
                                        }
                                    }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        {
                            isExpanded[node.id] && node.isFolder &&
                            <FileTree nodes={node.children} setIsAddingNode={setIsAddingNode} setActiveNode={setActiveNode} removeNode={removeNode} />
                        }
                    </div>
                ))
            }
        </div >
    )
}

const FileExplorer = () => {
    const [data, setData] = useState<FileNode[]>(json as FileNode[]);
    const [isAddingNode, setIsAddingNode] = useState("");
    const [nodeName, setNodeName] = useState("");
    const [fileExtension, setFileExtension] = useState("txt");
    const [activeNode, setActiveNode] = useState("");

    const addNode = () => {
        const updateTree = (list: FileNode[]): FileNode[] => {
            return list.map((node) => {
                console.log(node);
                if (node.id === activeNode && node.isFolder) {
                    if (isAddingNode === "folder") {
                        return {
                            ...node,
                            children: [
                                ...node.children,
                                {
                                    id: Date.now().toString(),
                                    name: nodeName,
                                    isFolder: true,
                                    children: [],
                                }
                            ]
                        }
                    } else {
                        return {
                            ...node,
                            children: [
                                ...node.children!,
                                {
                                    id: Date.now().toString(),
                                    name: `${nodeName}.${fileExtension}`,
                                    isFolder: false,
                                }
                            ]
                        }
                    }
                }
                if (node.isFolder) {
                    return {
                        ...node,
                        children: updateTree(node.children)
                    }
                }
                return node;
            })
        }

        setData(prev => updateTree(prev));
        setIsAddingNode("");
        setNodeName("");
        setFileExtension("");
    }

    const removeNode = (nodeId: string) => {
        const deleteFromTree = (list: FileNode[]): FileNode[] => {
            return list.filter(node => node.id !== nodeId).map(node => {
                if (node.isFolder) {
                    return {
                        ...node,
                        children: deleteFromTree(node.children),
                    }
                }
                return node;
            })
        }
        setData(prev => deleteFromTree(prev));
    }

    return (
        <div>
            <h2>File/Folder Explorer</h2>
            <FileTree nodes={data} setIsAddingNode={setIsAddingNode} setActiveNode={setActiveNode} removeNode={removeNode} />
            {
                isAddingNode &&
                <div>
                    <div>
                        <input
                            type='text'
                            placeholder='Type here...'
                            value={nodeName}
                            onChange={(e) => setNodeName(e.target.value)}
                        />
                        {
                            isAddingNode === "file" &&
                            <select value={fileExtension} onChange={(e) => setFileExtension(e.target.value)}>
                                <option value='txt'>Txt</option>
                                <option value='png'>Png</option>
                                <option value='jpeg'>JPEG</option>
                                <option value='svg'>Svg</option>
                                <option value='pdf'>Pdf</option>
                            </select>
                        }
                    </div>
                    <div>
                        <button type='button' title='Add' onClick={addNode}>Add</button>
                        <button type='button' title='Cancel' onClick={() => setIsAddingNode("")}>Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default FileExplorer